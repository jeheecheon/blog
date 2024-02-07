using System.Text.Json;
using Application.Services.Blog;
using Core.DTOs;
using Infrastructur.Models;
using Infrastructure.Models;
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
    public IActionResult GetComments([FromRoute] Guid post_id)
    {
        IEnumerable<get_comments_likes_has_liked>? comments = _blogService.GetComments(post_id);
        return Ok(JsonSerializer.Serialize(comments));
    }

    [HttpPost("post/{post_id}/has-liked")]
    public async Task<IActionResult> PostBlogPostHasLikedAsync([FromRoute] Guid post_id, [FromBody] bool has_liked)
    {
        var result = await _blogService.SetPostHasLikedAsync(post_id, has_liked);
        if (result)
            return Ok(JsonSerializer.Serialize(new
            {
                has_liked
            }));
        else
            return BadRequest();
    }

    [HttpPost("comment/{comment_id}/has-liked")]
    public async Task<IActionResult> PostBlogCommentHasLikedAsync([FromRoute] Guid comment_id, [FromBody] bool has_liked)
    {
        var result = await _blogService.SetCommentHasLikedAsync(comment_id, has_liked);

        if (result)
            return Ok(JsonSerializer.Serialize(new
            {
                has_liked
            }));
        else
            return BadRequest();
    }
}