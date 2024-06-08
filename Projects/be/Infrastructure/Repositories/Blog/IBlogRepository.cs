using Core.DTOs;
using Infrastructur.Models;
using Infrastructure.Models;

namespace Infrastructure.Repositories.Blog
{
    public interface IBlogRepository
    {
        public IEnumerable<Category>? GetAllCategories();
        public Task<bool> CreatePostAsync(PostUploadRequestDto post);
        public IEnumerable<PostsLikesCommentsFilteredByCategory>? GetCategoryPosts(int offset, int limit, string category);
        public IEnumerable<PostsLikesComments>? GetRecentPosts(int offset, int limit);
        public PostLikesHasLiked? GetPostWithHasLiked(Guid post_id, Guid account_id);
        public PostLikes? GetPost(Guid post_id);
        public Task<int> CreateCommentAsync(Guid account_id, Guid post_id, string content, Guid? parent_comment_id);
        public IEnumerable<CommentsLikes>? GetComments(Guid post_id);
        public IEnumerable<CommentsLikesHasLiked>? GetCommentsWithHasLiked(Guid post_id, Guid account_id);
        public Task<bool> DeleteLikedPostAsync(Guid post_id, Guid account_id);
        public Task<bool> CreateLikedPostAsync(Guid post_id, Guid account_id);
        public Task<bool> DeleteLikedCommentAsync(Guid comment_id, Guid account_id);
        public Task<bool> CreateLikedCommentAsync(Guid comment_id, Guid account_id);
        public IEnumerable<PostSummary>? GetPostLists();
        public PostWithMetadata? GetPostWithMetadata(Guid post_id);
        public Task<bool> UpdatePostAsync(PostWithMetadata post);
        public Task<bool> CreateEmptyPostAsync();
        public Task<bool> DeletePostAsync(Guid post_id);
        public StaticLikePostLikes? GetStaticLikePost(Guid post_id);
        public StaticLikePostLikesHasLiked? GetStaticLikePostWithHasLiked(Guid post_id, Guid account_id);
        public Task<bool> UpdateEditedAtAsync(PostWithMetadata post);
        public Task<bool> SetEditedAtAsNullAsync(PostWithMetadata post);
        public Task<bool> UpdateUploadedAtAsync(PostWithMetadata post);
        public int GetPostCnt();
        public int GetPostCntByCategory(string category);
    }
}