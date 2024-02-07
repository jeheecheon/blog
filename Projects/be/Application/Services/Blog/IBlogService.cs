using Core.DTOs;
using Infrastructur.Models;
using Infrastructure.Models;

namespace Application.Services.Blog;

public interface IBlogService
{
    public IEnumerable<_category>? GetAllCategories();
    public string SanitizeContent(string dirty);
    public Task<bool> UploadPostAsync(PostUploadRequestDto post);
    public IEnumerable<get_posts_likes_comments>? GetPosts(int page, string? category);
    public get_post_likes_has_liked? GetPost(Guid post_id);
    public Task<bool> UploadCommentAsync(Guid post_id, CommentUploadRequestDto commentToUpload);
    public IEnumerable<get_comments_likes_has_liked>? GetComments(Guid post_id);
    public Task<bool> SetPostHasLikedAsync(Guid post_id, bool has_liked);
    public Task<bool> SetCommentHasLikedAsync(Guid comment_id, bool has_liked);
}
