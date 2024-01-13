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

    [HttpGet("abcd")]
    public IActionResult TestEndpoint() {
        return Ok("Hello World");
    }

}
