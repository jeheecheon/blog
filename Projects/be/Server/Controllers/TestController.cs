using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase {
    private readonly ILogger<TestController> _logger;

    public TestController(
        ILogger<TestController> logger
    ) {
        _logger = logger;
    }

    [HttpGet("abcd")]
    public IActionResult TestEndpoint() {
        return Ok("Hello World");
    }
}
