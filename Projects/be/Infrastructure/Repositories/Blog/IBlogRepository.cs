using Core.DTOs;
using Infrastructur.Models;
using Infrastructure.Models;

namespace Infrastructure.Repositories.Blog
{
    public interface IBlogRepository
    {
        public IEnumerable<Category>? GetAllCategories();
        public Task<bool> CreatePostAsync(PostUploadRequestDto post);
        public IEnumerable<GetPostsLikesComments>? GetPosts(int offset, int limit);
        public GetPostLikesHasLiked? GetPostWithHasLiked(Guid post_id, Guid account_id);
        public GetPostLikes? GetPost(Guid post_id);
        public Task<int> CreateCommentAsync(Guid account_id, Guid post_id, string content, Guid? parent_comment_id);
        public IEnumerable<GetCommentsLikes>? GetComments(Guid post_id);
        public IEnumerable<GetCommentsLikesHasLiked>? GetCommentsWithHasLiked(Guid post_id, Guid account_id);
        public Task<bool> DeleteLikedPostAsync(Guid post_id, Guid account_id);
        public Task<bool> CreateLikedPostAsync(Guid post_id, Guid account_id);
        public Task<bool> DeleteLikedCommentAsync(Guid comment_id, Guid account_id);
        public Task<bool> CreateLikedCommentAsync(Guid comment_id, Guid account_id);
    }
}