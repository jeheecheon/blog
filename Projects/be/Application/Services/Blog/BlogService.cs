using Core.DTOs;
using Infrastructur.Models;
using Infrastructure.Repositories.Blog;
using Microsoft.Extensions.Logging;
using Ganss.Xss;
using Infrastructur.Repositories.Account;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Infrastructure.Models;

namespace Application.Services.Blog;

public class BlogService : IBlogService
{
    private readonly ILogger<BlogService> _logger;
    private readonly IBlogRepository _blogRepository;
    private readonly IAccountRepository _accountRepository;
    private readonly IHttpContextAccessor _httpContextAccessor;

    static private readonly int _PostsPerPage = 99;
    public BlogService(
        ILogger<BlogService> logger,
        IBlogRepository blogRepository,
        IAccountRepository accountRepository,
        IHttpContextAccessor httpContextAccessor
    )
    {
        _logger = logger;
        _blogRepository = blogRepository;
        _accountRepository = accountRepository;
        _httpContextAccessor = httpContextAccessor;
    }

    public IEnumerable<category>? GetAllCategories()
    {
        return _blogRepository.GetAllCategories();
    }

    public string SanitizeContent(string dirty)
    {
        var sanitizer = new HtmlSanitizer();
        return sanitizer.Sanitize(dirty);
    }

    public async Task UploadPostAsync(PostUploadRequestDto post)
    {
        post.title = SanitizeContent(post.title);
        post.content = SanitizeContent(post.content);
        await _blogRepository.CreatePostAsync(post);
    }

    public IEnumerable<get_posts_likes_comments>? GetPosts(int page, string? category)
    {
        int offset = (page - 1) * _PostsPerPage;

        return _blogRepository.GetPosts(offset, _PostsPerPage);
    }

    public get_post_likes_has_liked? GetPost(Guid post_id)
    {
        if (string.IsNullOrWhiteSpace(post_id.ToString()))
            return null;
        string? guidString = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid)?.Value;
        if (string.IsNullOrWhiteSpace(guidString))
            return null;
        Guid account_id = Guid.Parse(guidString);

        return _blogRepository.GetPost(post_id, account_id);
    }

    public async Task<bool> UploadCommentAsync(Guid post_id, CommentUploadRequestDto commentToUpload)
    {
        if (string.IsNullOrWhiteSpace(post_id.ToString()))
            return false;
        if (string.IsNullOrWhiteSpace(commentToUpload.content))
            return false;

        string? guidString = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid)?.Value;
        if (string.IsNullOrWhiteSpace(guidString))
            return false;
        Guid account_id = Guid.Parse(guidString);

        string clean = SanitizeContent(commentToUpload.content);

        int affectedRowsCnt = await _blogRepository.CreateCommentAsync(account_id, post_id, clean, commentToUpload.parent_comment_id);

        return affectedRowsCnt > 0;
    }

    public IEnumerable<comments_for_post>? GetComments(Guid post_id)
    {
        return _blogRepository.GetCommentsByPostId(post_id);
    }

    public async Task<bool> SetPostHasLikedAsync(Guid post_id, bool has_liked)
    {
        if (string.IsNullOrWhiteSpace(post_id.ToString()))
            return false;
        string? guidString = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid)?.Value;
        if (string.IsNullOrWhiteSpace(guidString))
            return false;
        Guid account_id = Guid.Parse(guidString);

        if (has_liked)
            return await _blogRepository.CreateLikedPostAsync(post_id, account_id);
        else
            return await _blogRepository.DeleteLikedPostAsync(post_id, account_id);
    }
}
