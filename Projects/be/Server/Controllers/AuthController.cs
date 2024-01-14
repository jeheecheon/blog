using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

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
}
