using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
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
    
    [Authorize]
    [HttpGet("abcd")]
    public async Task<IActionResult> TestEndpointAsync() {
        var result = await HttpContext.AuthenticateAsync();
        Console.WriteLine(HttpContext.User.Identity?.IsAuthenticated);
        return Ok(JsonSerializer.Serialize("Hello World"));
    }

    [HttpGet("Hello")]
    public IActionResult Hello() {
        return Ok(JsonSerializer.Serialize(new {
            Message = "Hello my world"
        }));
    }
}
