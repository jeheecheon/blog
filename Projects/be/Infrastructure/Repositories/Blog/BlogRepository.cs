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

        public IEnumerable<category>? GetAllCategories()
        {
            try
            {
                return _mainContext.categories.FromSqlInterpolated(@$"
SELECT * FROM category
                ")
                    .AsEnumerable();
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return null;
            }
        }

        public async Task CreatePostAsync(PostUploadRequestDto post)
        {
            try
            {
                await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
INSERT INTO post (title, content, category_id) VALUES
    ({post.title}, {post.content}, {post.category_id})            
                ");
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
            }
        }

        public IEnumerable<post>? GetPosts(int offset, int limit)
        {
            try
            {
                return _mainContext.posts.FromSqlInterpolated(@$"
SELECT * FROM post
OFFSET {offset}
LIMIT {limit}
                ")
                    .AsEnumerable();
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return null;
            }
        }

        public post? GetPostById(Guid uuid)
        {
            try
            {
                return _mainContext.posts.FromSqlInterpolated(@$"
SELECT * FROM post
WHERE id = {uuid}
                ")
                    .AsEnumerable()
                    .FirstOrDefault();
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return null;
            }
        }


        public async Task CreateCommentAsync(Guid account_id, Guid post_id, string content)
        {
            try
            {
                await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
INSERT INTO comment (account_id, post_id, content) VALUES
    ({account_id}, {post_id}, {content})
                ");
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
            }
        }

        public IEnumerable<comment>? GetCommentsByPostId(Guid post_id)
        {
            try
            {
                // TODO: account_id 제외하고 보내는 것
                return _mainContext.comments.FromSqlInterpolated(@$"
SELECT * FROM comment WHERE post_id = {post_id}
                ");
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return null;
            }
        }
    }
}