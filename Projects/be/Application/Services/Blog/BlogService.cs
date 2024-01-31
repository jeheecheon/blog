using Core.DTOs;
using Infrastructur.Models;
using Infrastructure.Repositories.Blog;
using Microsoft.Extensions.Logging;
using Ganss.Xss;

namespace Application.Services.Blog;

public class BlogService : IBlogService
{
    private readonly ILogger<BlogService> _logger;
    private readonly IBlogRepository _blogRepository;

    static private readonly int _PostsPerPage = 99;
    public BlogService(
        ILogger<BlogService> logger,
        IBlogRepository blogRepository
    )
    {
        _logger = logger;
        _blogRepository = blogRepository;
    }

    public IEnumerable<category> GetAllCategories()
    {
        return _blogRepository.GetAllCategories();
    }

    public string SanitizeContent(string dirty)
    {
        var sanitizer = new HtmlSanitizer();
        return sanitizer.Sanitize(dirty);
    }

    public void UploadPost(PostUploadRequestDto post)
    {
        post.title = SanitizeContent(post.title);
        post.content = SanitizeContent(post.content);
        _blogRepository.CreatePost(post);
    }

    public IEnumerable<post> GetPosts(int page, string? category)
    {
        int offset = (page - 1) * _PostsPerPage;

        return _blogRepository.GetPosts(offset, _PostsPerPage);
    }

    public post? GetPost(Guid uuid)
    {
        return _blogRepository.GetPostById(uuid);
    }
}
