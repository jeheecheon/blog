using System.Text.Json;
using Infrastructure.DbContexts;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly ILogger<TestController> _logger;
    private readonly MainContext _mainContext;

    public TestController(
        ILogger<TestController> logger,
        MainContext mainContext
    )
    {
        _logger = logger;
        _mainContext = mainContext;
    }

    [Authorize]
    [HttpGet("abcd")]
    public async Task<IActionResult> TestEndpointAsync()
    {
        var result = await HttpContext.AuthenticateAsync();
        Console.WriteLine(HttpContext.User.Identity?.IsAuthenticated);
        return Ok(JsonSerializer.Serialize("Hello World"));
    }

    [HttpGet("Hello")]
    public IActionResult Hello()
    {
        var result = _mainContext.get_post_likes_has_liked.FromSqlInterpolated($"SELECT * FROM get_post_likes_has_liked({Guid.Parse("95f72b81-b464-4303-95ea-f9afb24c4d4f")}, {Guid.Parse("a4f6e95a-ecd2-4c74-aff5-256fd9b83ea7")})").ToList();

        return Ok(JsonSerializer.Serialize(result));
    }

    [Authorize]
    [HttpGet("auth")]
    public IActionResult AuthAsync()
    {
        return Ok(JsonSerializer.Serialize(new
        {
            Message = "Hello my world"
        }));
    }
}
