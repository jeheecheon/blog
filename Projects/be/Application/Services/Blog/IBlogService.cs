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
    public IEnumerable<PostsLikesComments>? GetRecentPosts(int page);
    public IEnumerable<PostsLikesCommentsFilteredByCategory>? GetCategoryPosts(int page, string category);
    public PostLikesHasLiked? GetPost(Guid post_id);
    public Task<bool> UploadCommentAsync(Guid post_id, CommentUploadRequestDto commentToUpload);
    public IEnumerable<CommentsLikesHasLiked>? GetComments(Guid post_id);
    public Task<bool> SetPostHasLikedAsync(Guid post_id, bool has_liked);
    public Task<bool> SetCommentHasLikedAsync(Guid comment_id, bool has_liked);
    public Task<string?> UploadFileToS3Async(IFormFile file, string key);
    public Task<string?> UploadImageToS3Async(IFormFile image, string post_id);
    public IEnumerable<PostSummary>? GetPostLists();
    public PostWithMetadata? GetPostWithMetadata(Guid post_id);
    public Task<bool> UpdatePostAsync(PostWithMetadata post, bool setEditedAt, bool setEditedAtAsNull, bool setUploadedAt);
    public Task<bool> UploadEmptyPost();
    public Task<bool> DeletePostAsync(Guid post_id);
    public StaticLikePostLikesHasLiked? GetStaticLikePost(Guid post_id);
}
