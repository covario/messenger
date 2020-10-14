using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using covario.ChatApp.Models;
using covario.ChatApp.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace covario.ChatApp.Controllers
{
    [ApiController]
    [Route("/api/login")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly IChatService _chatService;

        public LoginController(ILogger<LoginController> logger, IChatService chatService)
        {
            _logger = logger;
            _chatService = chatService;
        }

        [HttpPost]
        public async Task<IActionResult> Get(LoginModel request)
        {
            _logger.LogInformation("ConnectionId = {ConnectionId}", HttpContext.Connection.Id);
            
            var user = _chatService.SimpleLogin(HttpContext.Connection.Id, request.Username, request.Password);
            if (user != null)
            {
                _logger.LogInformation("New Login for {username}", request.Username);

//                var claimsIdentity = new ClaimsIdentity(new[]
//                    {
//                        new Claim("UserId", user.UserId),
//                        new Claim(ClaimTypes.Name, user.DisplayName),
//                    }, CookieAuthenticationDefaults.AuthenticationScheme);
//
//                var authProperties = new AuthenticationProperties
//                {
//                };
//
//                await HttpContext.SignInAsync(
//                    CookieAuthenticationDefaults.AuthenticationScheme,
//                    new ClaimsPrincipal(claimsIdentity),
//                    authProperties);
//
                return Ok();
            }

            _logger.LogWarning("Failed login for {username}", request.Username);
            return Unauthorized();
        }
    }
}
