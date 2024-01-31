using Core.DTOs;
using Infrastructur.Models;

namespace Infrastructure.Repositories.Blog
{
    public interface IBlogRepository
    {
        public IEnumerable<category> GetAllCategories();
        public void CreatePost(PostUploadRequestDto post);
        public IEnumerable<post> GetPosts(int offset, int limit);
        public post? GetPostById(Guid uuid);
    }
}