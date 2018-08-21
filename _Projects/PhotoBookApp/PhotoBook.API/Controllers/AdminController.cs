using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PhotoBook.API.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PhotoBook.API.Dtos;
using Microsoft.AspNetCore.Identity;
using PhotoBook.API.Models;
using Microsoft.AspNetCore.Authorization;

namespace PhotoBook.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext context;
        private readonly UserManager<User> userManager;
        public AdminController(DataContext context, UserManager<User> userManager)
        {
            this.userManager = userManager;
            this.context = context;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("userWithRoles")]
        public async Task<IActionResult> GetUserWithRoles()
        {
            var userList = await (from user in this.context.Users
                                  orderby user.UserName
                                  select new
                                  {
                                      Id = user.Id,
                                      UserName = user.UserName,
                                      Roles = (from userRole in user.UserRoles
                                               join role in this.context.Roles
                                               on userRole.RoleId
                                               equals role.Id
                                               select role.Name).ToList()
                                  }).ToListAsync();
            return Ok(userList);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("editRoles/{username}")]
        public async Task<IActionResult> EditRoles(string username, RoleEditDto roleEditDto)
        {
            var user = await this.userManager.FindByNameAsync(username);

            var userRoles = await this.userManager.GetRolesAsync(user);

            var selectedRoles = roleEditDto.RoleNames;

            selectedRoles = selectedRoles ?? new string[] { };

            var result = await this.userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded)
            {
                return BadRequest("Failed to add to roles");
            }

            result = await this.userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded)
            {
                return BadRequest("Failed to remove to roles");
            }

            return Ok(await this.userManager.GetRolesAsync(user));
        }

        [HttpGet("photosForModeration")]
        public IActionResult GetPhotosForModeration()
        {
            return Ok("Admin or Moderator");
        }
    }
}