using Core.DTOs;
using Infrastructur.Models;

namespace Application.Services.Blog;

public interface IBlogService
{
    public IEnumerable<category> GetAllCategories();
    public string SanitizeContent(string dirty);
    public void UploadPost(PostUploadRequestDto post);
    public IEnumerable<post> GetPosts(int page, string? category);
    public post? GetPost(Guid uuid);
}
