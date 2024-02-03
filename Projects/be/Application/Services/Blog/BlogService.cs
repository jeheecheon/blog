using Core.DTOs;
using Infrastructur.Models;
using Infrastructure.Repositories.Blog;
using Microsoft.Extensions.Logging;
using Ganss.Xss;
using Infrastructur.Repositories.Account;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

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

    public IEnumerable<post>? GetPosts(int page, string? category)
    {
        int offset = (page - 1) * _PostsPerPage;

        return _blogRepository.GetPosts(offset, _PostsPerPage);
    }

    public post? GetPost(Guid uuid)
    {
        return _blogRepository.GetPostById(uuid);
    }

    public async Task<bool> UploadCommentAsync(Guid post_id, string content)
    {
        if (string.IsNullOrWhiteSpace(content))
            return false;

        string? guidString = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid)?.Value;
        if (string.IsNullOrWhiteSpace(guidString))
            return false;
        Guid account_id = Guid.Parse(guidString);

        string clean = SanitizeContent(content);

        await _blogRepository.CreateCommentAsync(account_id, post_id, content);

        return true;
    }

    public IEnumerable<comment>? GetComments(Guid post_id)
    {
        return _blogRepository.GetCommentsByPostId(post_id);
    }
}
