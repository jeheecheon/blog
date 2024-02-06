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
        var result = _mainContext.get_posts_likes_comments_filted_by_category.FromSqlInterpolated($"SELECT * FROM get_posts_likes_comments_filted_by_category({0}, {11}, {"알고리즘"})").ToList();

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
