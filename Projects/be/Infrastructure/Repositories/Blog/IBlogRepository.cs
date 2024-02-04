using Core.DTOs;
using Infrastructur.Models;

namespace Infrastructure.Repositories.Blog
{
    public interface IBlogRepository
    {
        public IEnumerable<category>? GetAllCategories();
        public Task CreatePostAsync(PostUploadRequestDto post);
        public IEnumerable<post>? GetPosts(int offset, int limit);
        public post? GetPostById(Guid uuid);
        public Task CreateCommentAsync(Guid account_id, Guid post_id, string content);
        public IEnumerable<comments_for_post>? GetCommentsByPostId(Guid post_id);
    }
}