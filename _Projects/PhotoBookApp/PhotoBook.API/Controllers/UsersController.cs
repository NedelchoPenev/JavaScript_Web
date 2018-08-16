using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhotoBook.API.Data;
using PhotoBook.API.Dtos;
using PhotoBook.API.Helpers;
using PhotoBook.API.Models;

namespace PhotoBook.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IPhotoBookRepository repo;
        private readonly IMapper mapper;
        public UsersController(IPhotoBookRepository repo, IMapper mapper)
        {
            this.mapper = mapper;
            this.repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            userParams.userId = currentUserId;

            var users = await this.repo.GetUsers(userParams);

            var usersToReturn = this.mapper.Map<IEnumerable<UsersListDto>>(users);

            Response.AddPegination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name="GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await this.repo.GetUser(id);

            var userToReturn = this.mapper.Map<UserForDetailsDto>(user);

            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserUpdateDto userDto) {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var user = await this.repo.GetUser(id);
            var result = this.mapper.Map(userDto, user);
            

            if (await this.repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception("Unable to update user with id: " + id);
        }

        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id, int recipientId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            if (id == recipientId)
            {
                return BadRequest("You cannot like yourself");
            }

            var like = await this.repo.GetLike(id, recipientId);

            if (like != null)
            {
                return BadRequest("You already like this user");
            }

            if (await this.repo.GetUser(recipientId) == null)
            {
                return NotFound();
            }

            like = new Like
            {
                LikerId = id,
                LikeeId = recipientId
            };

            this.repo.Add<Like>(like);

            if (await this.repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to like user");
        }
    }
}