using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PhotoBook.API.Data;
using PhotoBook.API.Dtos;
using PhotoBook.API.Helpers;
using PhotoBook.API.Models;

namespace PhotoBook.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository authRepo;
        private readonly IConfiguration config;
        private readonly IMapper mapper;
        public AuthController(IAuthRepository authRepo, IConfiguration config, IMapper mapper)
        {
            this.mapper = mapper;
            this.config = config;
            this.authRepo = authRepo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegistrationDto userReg)
        {
            userReg.Username = userReg.Username.ToLower();

            if (await this.authRepo.UserExist(userReg.Username))
            {
                return BadRequest("User already exists.");
            }

            var userToCreate = this.mapper.Map<User>(userReg);

            var createdUser = this.authRepo.Register(userToCreate, userReg.Password);

            var userToReturn = this.mapper.Map<UserForDetailsDto>(userToCreate);

            return CreatedAtRoute("GetUser", new {controller = "user", id = userToCreate.Id}, userToReturn);
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userLogin)
        {
            var userLoginRepo = await this.authRepo.Login(userLogin.Username.ToLower(), userLogin.Password);

            if (userLoginRepo == null)
            {
                return Unauthorized();
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userLoginRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userLoginRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(this.config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}