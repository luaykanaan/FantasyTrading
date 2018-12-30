using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TradingSimulation.API.MappingsAndDtos;
using TradingSimulation.API.Models;

namespace TradingSimulation.API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // properties
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        // constructor
        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper, IConfiguration config)
        {
            _config = config;
            _mapper = mapper;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        // Tasks and Actions
        [HttpPost("register")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Register([FromBody]DtoIncomingUserRegister dto)
        {
            var userToRegister = _mapper.Map<User>(dto);

            var result = await _userManager.CreateAsync(userToRegister, dto.Password);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(userToRegister.UserName);
                await _userManager.AddToRoleAsync(user, "Member");

                return Ok(new { token = GenerateJwtToken(user).Result} ); //! should return createdAtRoute
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> Login([FromBody]DtoIncomingUserLogin dto)
        {
            // note the user is allowed to use username or email to login

            // check to see if entered field is username or password
            // we do that by checking if it contains the @ character
            // since we do not allow this character in username
            User user;
            if (dto.UserNameOrEmail.Contains("@"))
            {
                user = await _userManager.FindByEmailAsync(dto.UserNameOrEmail);
            }
            else
            {
                user = await _userManager.FindByNameAsync(dto.UserNameOrEmail);
            }

            // check to see if username / email exist
            if (user == null)
            {
                return Unauthorized();
            }

            // now check password
            var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);

            if (result.Succeeded)
            {
                return Ok(new { token = GenerateJwtToken(user).Result} );
            }

            //password check failed
            return Unauthorized();

        }

        // helper methods
        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id), //nameidentifier for id
                new Claim(ClaimTypes.Name, user.UserName), //name for username
                new Claim(ClaimTypes.Email, user.Email) //name for email
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:TokenKey").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDiscriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var generatedToken = tokenHandler.CreateToken(tokenDiscriptor);

            return tokenHandler.WriteToken(generatedToken);
        }

    }
}