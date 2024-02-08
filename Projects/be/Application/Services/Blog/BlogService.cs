using Core.DTOs;
using Infrastructur.Models;
using Infrastructure.Repositories.Blog;
using Microsoft.Extensions.Logging;
using Ganss.Xss;
using Infrastructur.Repositories.Account;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Infrastructure.Models;
using Application.Services.Account;

namespace Application.Services.Blog;

public class BlogService : IBlogService
{
    private readonly ILogger<BlogService> _logger;
    private readonly IBlogRepository _blogRepository;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IAccountService _accountService;

    static private readonly int _PostsPerPage = 99;
    public BlogService(
        ILogger<BlogService> logger,
        IBlogRepository blogRepository,
        IHttpContextAccessor httpContextAccessor,
        IAccountService accountService
    )
    {
        _logger = logger;
        _blogRepository = blogRepository;
        _httpContextAccessor = httpContextAccessor;
        _accountService = accountService;
    }

    public IEnumerable<Category>? GetAllCategories()
    {
        return _blogRepository.GetAllCategories();
    }

    public string SanitizeContent(string dirty)
    {
        var sanitizer = new HtmlSanitizer();
        return sanitizer.Sanitize(dirty);
    }

    public async Task<bool> UploadPostAsync(PostUploadRequestDto post)
    {
        if (_accountService.FilterAdmin() is false)
            return false;
        System.Console.WriteLine("통과");
        post.title = SanitizeContent(post.title);
        post.content = SanitizeContent(post.content);
        return await _blogRepository.CreatePostAsync(post);
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
        {
            get_post_likes? post = _blogRepository.GetPost(post_id);
            if (post is null)
                return null;
            return new get_post_likes_has_liked(post);
        }
        else
        {
            Guid account_id = Guid.Parse(guidString);
            return _blogRepository.GetPostWithHasLiked(post_id, account_id);
        }
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

    public IEnumerable<get_comments_likes_has_liked>? GetComments(Guid post_id)
    {
        if (string.IsNullOrWhiteSpace(post_id.ToString()))
            return null;
        string? guidString = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid)?.Value;
        IEnumerable<get_comments_likes_has_liked>? comments;

        if (string.IsNullOrWhiteSpace(guidString))
        {
            var commentsWithoutHasLiked = _blogRepository.GetComments(post_id);
            if (commentsWithoutHasLiked is null)
                return null;
                
            comments = commentsWithoutHasLiked
                .Select((comment) => new get_comments_likes_has_liked(comment));
        }
        else
        {
            Guid account_id = Guid.Parse(guidString);
            comments = _blogRepository.GetCommentsWithHasLiked(post_id, account_id);
            if (comments is null)
                return null;
        }

        foreach (var comment in comments)
            if (comment.is_deleted)
                comment.content = "[Deleted comment...]";

        return comments;
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

    public async Task<bool> SetCommentHasLikedAsync(Guid comment_id, bool has_liked)
    {
        if (string.IsNullOrWhiteSpace(comment_id.ToString()))
            return false;
        string? guidString = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid)?.Value;
        if (string.IsNullOrWhiteSpace(guidString))
            return false;
        Guid account_id = Guid.Parse(guidString);

        if (has_liked)
            return await _blogRepository.CreateLikedCommentAsync(comment_id, account_id);
        else
            return await _blogRepository.DeleteLikedCommentAsync(comment_id, account_id);
    }
}
