using System.Text.Json;
using Application.Services.Blog;
using Core.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogController : ControllerBase
{
    private readonly ILogger<BlogController> _logger;
    private readonly IBlogService _blogService;
    public BlogController(
        ILogger<BlogController> logger,
        IBlogService blogService
    )
    {
        _logger = logger;
        _blogService = blogService;
    }

    // [Authorize]
    [HttpPost("post-upload")]
    public async Task<IActionResult> PostUploadAsync([FromBody] PostUploadRequestDto post)
    {
        // TODO: role admin 검사 
        _blogService.UploadPost(post);
        return Ok();
    }

    // [Authorize]
    [HttpGet("all-categories")]
    public IActionResult AllCategories()
    {
        // TODO: role admin 검사 
        return Ok(JsonSerializer.Serialize(_blogService.GetAllCategories()));
    }

    [HttpGet("posts/categories/{category}/pages/{page}")]
    public IActionResult GetPosts([FromRoute] int page, [FromRoute] string? category)
    {
        var result = _blogService.GetPosts(page, category);
        if (result.Count() == 0)
            return BadRequest();
        return Ok(JsonSerializer.Serialize(result));
    }

    [HttpGet("post/{uuid}")]
    public IActionResult GetPost([FromRoute] Guid uuid)
    {
        var blog = _blogService.GetPost(uuid);
        if (blog is not null)
            return Ok(JsonSerializer.Serialize(blog));
        else
            return BadRequest();
    }
}