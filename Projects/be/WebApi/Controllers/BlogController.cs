using System.Text.Json;
using Application.Services.Blog;
using Core.DTOs;
using Infrastructur.Models;
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
        await _blogService.UploadPostAsync(post);
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
        if (result is null || result.Count() == 0)
            return BadRequest();
        return Ok(JsonSerializer.Serialize(result));
    }

    [HttpGet("post/{post_id}")]
    public IActionResult GetPost([FromRoute] Guid post_id)
    {
        var blog = _blogService.GetPost(post_id);
        if (blog is not null)
            return Ok(JsonSerializer.Serialize(blog));
        else
            return BadRequest();
    }

    [HttpPost("post/{post_id}/comment")]
    public async Task<IActionResult> PostCommentAsync([FromRoute] Guid post_id, [FromBody] CommentUploadRequestDto commentToUpload)
    {
        bool isSucceded = await _blogService.UploadCommentAsync(post_id, commentToUpload);
        if (isSucceded)
            return Ok();
        else
            return BadRequest();
    }

    [HttpGet("post/{post_id}/comments")]
    public async Task<IActionResult> GetCommentsAsync([FromRoute] Guid post_id)
    {
        IEnumerable<comments_for_post>? comments = _blogService.GetComments(post_id);

        await Task.Delay(1000);
        if (comments is null)
            return BadRequest();
        else
            return Ok(JsonSerializer.Serialize(comments));
    }
}