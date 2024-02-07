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
        var result = _mainContext.get_comments_likes_has_liked.FromSqlInterpolated($"SELECT * FROM get_comments_likes_has_liked({Guid.Parse("7d09549c-dcc3-48b7-af72-c14a6540ffdc")}, {Guid.Parse("14f469ba-f377-4e82-8913-6dd5ae7c5289")})").ToList();

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
