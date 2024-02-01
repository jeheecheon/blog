using Core.DTOs;
using Infrastructur.Models;

namespace Application.Services.Blog;

public interface IBlogService
{
    public IEnumerable<category>? GetAllCategories();
    public string SanitizeContent(string dirty);
    public Task UploadPostAsync(PostUploadRequestDto post);
    public IEnumerable<post>? GetPosts(int page, string? category);
    public post? GetPost(Guid uuid);
    public Task<bool> UploadCommentAsync(Guid post_id, string content);
}
