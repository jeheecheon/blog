using Core.DTOs;
using Infrastructur.Models;
using Infrastructure.Models;
using Microsoft.AspNetCore.Http;

namespace Application.Services.Blog;

public interface IBlogService
{
    public IEnumerable<Category>? GetAllCategories();
    public string SanitizeContent(string dirty);
    public Task<bool> UploadPostAsync(PostUploadRequestDto post);
    public IEnumerable<GetPostsLikesComments>? GetRecentPosts(int page);
    public IEnumerable<GetPostsLikesCommentsFilteredByCategory>? GetCategoryPosts(int page, string category);
    public GetPostLikesHasLiked? GetPost(Guid post_id);
    public Task<bool> UploadCommentAsync(Guid post_id, CommentUploadRequestDto commentToUpload);
    public IEnumerable<GetCommentsLikesHasLiked>? GetComments(Guid post_id);
    public Task<bool> SetPostHasLikedAsync(Guid post_id, bool has_liked);
    public Task<bool> SetCommentHasLikedAsync(Guid comment_id, bool has_liked);
    public Task<string?> UploadImageToS3Async(IFormFile image, int post_id);
}
