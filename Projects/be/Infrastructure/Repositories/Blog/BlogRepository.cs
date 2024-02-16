using Core.DTOs;
using Infrastructur.Models;
using Infrastructure.DbContexts;
using Infrastructure.Models;
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

        public IEnumerable<Category>? GetAllCategories()
        {
            try
            {
                return _mainContext.Categories.FromSqlInterpolated(@$"
SELECT * FROM category;
                ")
                    .AsEnumerable();
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return null;
            }
        }

        public async Task<bool> CreatePostAsync(PostUploadRequestDto post)
        {
            try
            {
                int affectedRowsCnt = await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
INSERT INTO post (title, content, category_id) VALUES
    ({post.title}, {post.content}, {post.category_id})            
                ");
                return affectedRowsCnt > 0;
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return false;
            }
        }

        public async Task<bool> CreateEmptyPostAsync()
        {
            try
            {
                return await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
INSERT INTO post (title, content, category_id) VALUES
    ({"Example title"}, {"Example content"}, {"Uncategorized"})            
                ") > 0;
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return false;
            }
        }

        public IEnumerable<GetPostsLikesComments>? GetRecentPosts(int offset, int limit)
        {
            try
            {
                return _mainContext.GetPostsLikesComments.FromSqlInterpolated(@$"
SELECT * FROM get_posts_likes_comments({offset}, {limit})
                ")
                    .AsEnumerable();
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return null;
            }
        }

        public IEnumerable<GetPostsLikesCommentsFilteredByCategory>? GetCategoryPosts(int offset, int limit, string category)
        {
            try
            {
                return _mainContext.GetPostsLikesCommentsFilteredByCategories.FromSqlInterpolated(@$"
SELECT * FROM get_posts_likes_comments_filtered_by_category({offset}, {limit}, {category})
                ")
                    .AsEnumerable();
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return null;
            }
        }

        public GetPostLikesHasLiked? GetPostWithHasLiked(Guid post_id, Guid account_id)
        {
            try
            {
                return _mainContext.GetPostLikesHasLikeds.FromSqlInterpolated(@$"
SELECT * FROM get_post_likes_has_liked({post_id}, {account_id})
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

        public GetPostLikes? GetPost(Guid post_id)
        {
            try
            {
                return _mainContext.GetPostLikess.FromSqlInterpolated(@$"
SELECT * FROM get_post_likes({post_id})
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

        public async Task<int> CreateCommentAsync(Guid account_id, Guid post_id, string content, Guid? parent_comment_id)
        {
            try
            {
                if (parent_comment_id is null)
                    return await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
INSERT INTO comment (account_id, post_id, content) VALUES
    ({account_id}, {post_id}, {content})
                    ");
                else
                    return await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
INSERT INTO comment (account_id, post_id, content, parent_comment_id) VALUES
    ({account_id}, {post_id}, {content}, {parent_comment_id})
                    ");
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return 0;
            }
        }

        public IEnumerable<GetCommentsLikesHasLiked>? GetCommentsWithHasLiked(Guid post_id, Guid account_id)
        {
            try
            {
                return _mainContext.GetCommentsLikesHasLiked.FromSqlInterpolated(@$"
SELECT * FROM get_comments_likes_has_liked({post_id}, {account_id})
                ");
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return null;
            }
        }

        public IEnumerable<GetCommentsLikes>? GetComments(Guid post_id)
        {
            try
            {
                return _mainContext.GetCommentsLikess.FromSqlInterpolated(@$"
SELECT * FROM get_comments_likes({post_id})
                ");
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return null;
            }
        }

        public async Task<bool> DeleteLikedPostAsync(Guid post_id, Guid account_id)
        {
            try
            {
                var affectedRowsCnt = await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
DELETE FROM liked_post
WHERE post_id = {post_id}
    AND account_id = {account_id}
                ");
                return affectedRowsCnt > 0;
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return false;
            }
        }


        public async Task<bool> CreateLikedPostAsync(Guid post_id, Guid account_id)
        {
            try
            {
                var affectedRowsCnt = await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
INSERT INTO liked_post (post_id, account_id) VALUES
    ({post_id}, {account_id})
                ");
                return affectedRowsCnt > 0;
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return false;
            }
        }

        public async Task<bool> DeleteLikedCommentAsync(Guid comment_id, Guid account_id)
        {
            try
            {
                var affectedRowsCnt = await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
DELETE FROM liked_comment
WHERE comment_id = {comment_id}
    AND account_id = {account_id}
                ");
                return affectedRowsCnt > 0;
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return false;
            }
        }

        public async Task<bool> CreateLikedCommentAsync(Guid comment_id, Guid account_id)
        {
            try
            {
                var affectedRowsCnt = await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
INSERT INTO liked_comment (comment_id, account_id) VALUES
    ({comment_id}, {account_id})
                ");
                return affectedRowsCnt > 0;
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return false;
            }
        }

        public IEnumerable<PostSummary>? GetPostLists()
        {
            try
            {
                return _mainContext.PostSummaru.FromSql(@$"
SELECT id, title, uploaded_at, edited_at FROM post;
                ")
                    .AsEnumerable();
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return null;
            }
        }

        public PostWithMetadata? GetPostWithMetadata(Guid post_id)
        {
            try
            {
                return _mainContext.PostWithMetadata.FromSqlInterpolated(@$"
SELECT * FROM post WHERE id = {post_id};
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

        public async Task<bool> UpdatePostAsync(PostWithMetadata post)
        {
            try
            {
                return await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
UPDATE post 
SET 
    title = {post.Title},
    content = {post.Content},
    edited_at = CURRENT_TIMESTAMP,
    cover = {post.Cover},
    category_id = {post.CategoryId},
    is_public = {post.IsPublic}
WHERE id = {post.Id};
                ")
                    > 0;
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return false;
            }
        }

        public async Task<bool> UpdatePostAlongWithUpdatedAtAsync(PostWithMetadata post)
        {
            try
            {
                return await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
UPDATE post 
SET 
    title = {post.Title},
    content = {post.Content},
    edited_at = NULL,
    cover = {post.Cover},
    category_id = {post.CategoryId},
    is_public = {post.IsPublic},
    uploaded_at = CURRENT_TIMESTAMP
WHERE id = {post.Id};
                ")
                    > 0;
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return false;
            }
        }

        public async Task<bool> DeletePostAsync(Guid post_id)
        {
            try
            {
                return await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
DELETE FROM post
WHERE id = {post_id}
                ")
                    > 0;
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return false;
            }
        }

        public GetStaticLikePostLikesHasLiked? GetStaticLikePostWithHasLiked(Guid post_id, Guid account_id)
        {
            try
            {
                return _mainContext.GetStaticLikePostLikesHasLikeds.FromSqlInterpolated(@$"
SELECT * FROM get_static_like_post_likes_has_liked({post_id}, {account_id})
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

        public GetStaticLikePostLikes? GetStaticLikePost(Guid post_id)
        {
            try
            {
                return _mainContext.GetStaticLikePostLikess.FromSqlInterpolated(@$"
SELECT * FROM get_static_like_post_likes({post_id})
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
    }
}