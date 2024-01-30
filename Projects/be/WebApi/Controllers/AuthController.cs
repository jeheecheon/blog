using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase {
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        ILogger<AuthController> logger
    ) {
        _logger = logger;
    }

    [HttpGet("sign-out")]
    public async Task<IActionResult> SignOutAsync() {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Ok();
    }
    
    [HttpGet("authentication")]
    public async Task<IActionResult> AuthenticationAsync() {
        var result = await HttpContext.AuthenticateAsync();
        
        // Console.WriteLine(result.Succeeded);
        // Console.WriteLine(HttpContext.User.Claims.FirstOrDefault((c) => c.Type == ClaimTypes.Email));
        if (result.Succeeded) {
            return Ok(JsonSerializer.Serialize(new {
                email = HttpContext.User.Claims.FirstOrDefault((c) => c.Type == ClaimTypes.Email)?.Value,
                name = HttpContext.User.Claims.FirstOrDefault((c) => c.Type == ClaimTypes.Email)?.Value
            }));
        }
        else {
            return BadRequest();
        }
    }
}
