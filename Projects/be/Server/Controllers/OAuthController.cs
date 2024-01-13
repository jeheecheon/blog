using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OAuthController : ControllerBase {
    private readonly ILogger<OAuthController> _logger;

    public OAuthController(
        ILogger<OAuthController> logger
    ) {
        _logger = logger;
    }

    [HttpGet("sign-in")]
    public IActionResult SignIn() {
        return Ok("Hello World");
    }

    [HttpGet("cb-google")]
    public IActionResult GoogleCallback() {
        return Ok("Hello World");
    }
}
