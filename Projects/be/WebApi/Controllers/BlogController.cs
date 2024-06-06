using System.Text.Json;
using Application.Services.Account;
using Application.Services.Blog;
using Core.DTOs;
using Infrastructur.Models;
using Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogController : ControllerBase
{
    private readonly ILogger<BlogController> _logger;
    private readonly IBlogService _blogService;
    private readonly IAccountService _accountService;
    // private readonly MainContext _mainContext;

    public BlogController(
        ILogger<BlogController> logger,
        IBlogService blogService,
        IAccountService accountService
    // , MainContext mainContext
    )
    {
        _logger = logger;
        _blogService = blogService;
        _accountService = accountService;
        // _mainContext = mainContext;
    }

    // [Authorize]
    // [HttpPost("post/upload")]
    // public async Task<IActionResult> PostUploadAsync([FromBody] PostUploadRequestDto post)
    // {
    //     if (_accountService.FilterAdmin() is false)
    //         return Forbid();
    //     return await _blogService.UploadPostAsync(post) ? Ok() : BadRequest();
    // }

    [Authorize]
    [HttpPost("post/upload-empty")]
    public async Task<IActionResult> PostUploadAsync()
    {
        if (_accountService.FilterAdmin() is false)
            return Forbid();
        return await _blogService.UploadEmptyPost() ? Ok() : BadRequest();
    }

    [Authorize]
    [HttpPost("post/update")]
    public async Task<IActionResult> PostUpdateAsync([FromBody] PostWithMetadata post, [FromQuery] bool set_edited_date, [FromQuery] bool set_uploaded_date, [FromQuery] bool set_edited_date_as_null)
    {
        if (_accountService.FilterAdmin() is false)
            return Forbid();
        return await _blogService.UpdatePostAsync(
            post,
            set_edited_date,
            set_edited_date_as_null,
            set_uploaded_date)
            ? Ok()
            : BadRequest();
    }

    // [Authorize]
    [HttpGet("categories/leaf")]
    public IActionResult AllCategories()
    {
        var result = _blogService.GetAllCategories()?.Where(
            cate => cate.IsBottomLevel
        );

        return Ok(JsonSerializer.Serialize(result));
    }

    [HttpGet("recent-posts/pages/{page}")]
    public IActionResult GetRecentPosts([FromRoute] int page)
    {
        return Ok(JsonSerializer.Serialize(_blogService.GetRecentPosts(page)));
    }

    [HttpGet("categories/{category}/pages/{page}")]
    public IActionResult GetPosts([FromRoute] int page, [FromRoute] string category)
    {
        return Ok(JsonSerializer.Serialize(_blogService.GetCategoryPosts(page, category)));
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
    [Authorize]
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
        IEnumerable<CommentsLikesHasLiked>? comments = _blogService.GetComments(post_id);
        return Ok(JsonSerializer.Serialize(comments));
    }

    [HttpPost("post/{post_id}/has-liked")]
    [Authorize]
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
    [Authorize]
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

    [HttpPost("posts/{post_id}/images/upload")]
    [Authorize]
    public async Task<IActionResult> UploadImageAsync(IFormFile image, [FromRoute] string post_id)
    {
        if (_accountService.FilterAdmin() == false)
            return Forbid("The user doesn't have permission to upload");

        string? imageUrl = await _blogService.UploadImageToS3Async(image, post_id);
        if (string.IsNullOrWhiteSpace(imageUrl))
            return BadRequest("File hasn't been provided properly");

        return Ok(JsonSerializer.Serialize(new
        {
            imageUrl
        }));
    }

    [HttpGet("posts/list")]
    [Authorize]
    public IActionResult GetPostsList()
    {
        var result = _blogService.GetPostLists();

        if (result is null)
            return Forbid("You do not have access to resource you asked...!!");
        return Ok(JsonSerializer.Serialize(result));
    }

    [HttpGet("post/{post_id}/with-metadata")]
    public IActionResult GetPostWithMetadata([FromRoute] Guid post_id)
    {
        if (_accountService.FilterAdmin() == false)
            return Forbid();
        return Ok(JsonSerializer.Serialize(_blogService.GetPostWithMetadata(post_id)));
    }

    [HttpDelete("post/{post_id}")]
    public async Task<IActionResult> DeletePostAsync([FromRoute] Guid post_id)
    {
        if (_accountService.FilterAdmin() == false)
            return Forbid();
        return await _blogService.DeletePostAsync(post_id) ? Ok() : BadRequest();
    }

    [HttpGet("post/{post_id}/static-like")]
    public IActionResult GetStaticLikePost([FromRoute] Guid post_id)
    {
        var blog = _blogService.GetStaticLikePost(post_id);
        if (blog is not null)
            return Ok(JsonSerializer.Serialize(blog));
        else
            return BadRequest();
    }

    [HttpGet("music")]
    public async Task<IActionResult> GetMusicListAsync()
    {
        return Ok(JsonSerializer.Serialize(await _blogService.GetMusicListFromS3Async()));
    }
}