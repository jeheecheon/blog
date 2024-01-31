using Core.DTOs;
using Infrastructur.Models;
using Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Repositories.Blog
{
    public class BlogRepository : IBlogRepository
    {
        private readonly ILogger<BlogRepository> _logger;
        private readonly MainContext _mainContext;

        public BlogRepository(
            ILogger<BlogRepository> logger,
            MainContext mainContext
        )
        {
            _logger = logger;
            _mainContext = mainContext;
        }

        public IEnumerable<category> GetAllCategories()
        {
            return _mainContext.categories.FromSqlInterpolated(@$"
SELECT * FROM category
            ")
                .AsEnumerable();
        }

        public void CreatePost(PostUploadRequestDto post)
        {
            _mainContext.Database.ExecuteSqlInterpolated(@$"
INSERT INTO post (title, content, category_id) VALUES
    ({post.title}, {post.content}, {post.category_id})            
            ");
        }

        public IEnumerable<post> GetPosts(int offset, int limit)
        {
            return _mainContext.posts.FromSqlInterpolated(@$"
SELECT * FROM post
OFFSET {offset}
LIMIT {limit}
            ")
                .AsEnumerable();
        }

        public post? GetPostById(Guid uuid)
        {
            return _mainContext.posts.FromSqlInterpolated(@$"
SELECT * FROM post
WHERE id = {uuid}
            ")
                .AsEnumerable()
                .FirstOrDefault();
        }
    }
}