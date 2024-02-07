using Core.DTOs;
using Infrastructur.Models;
using Infrastructure.Models;

namespace Infrastructure.Repositories.Blog
{
    public interface IBlogRepository
    {
        public IEnumerable<category>? GetAllCategories();
        public Task CreatePostAsync(PostUploadRequestDto post);
        public IEnumerable<get_posts_likes_comments>? GetPosts(int offset, int limit);
        public get_post_likes_has_liked? GetPost(Guid post_id, Guid account_id);
        public Task<int> CreateCommentAsync(Guid account_id, Guid post_id, string content, Guid? parent_comment_id);
        public IEnumerable<comments_for_post>? GetCommentsByPostId(Guid post_id);
    }
}