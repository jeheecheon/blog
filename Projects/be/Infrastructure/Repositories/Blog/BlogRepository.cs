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
                return _mainContext.Category.FromSqlInterpolated(@$"
SELECT * FROM category;
                ")
                    .ToList()
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

        public IEnumerable<PostsLikesComments>? GetRecentPosts(int offset, int limit)
        {
            try
            {
                return _mainContext.PostsLikesComments.FromSqlInterpolated(@$"
WITH likes AS (
    SELECT post_id, COUNT(*) AS like_cnt
    FROM liked_post
    GROUP BY post_id
),
comments AS (
    SELECT 
        post_id, 
        COUNT(*) AS comment_cnt
    FROM comment
    WHERE is_deleted = false
    GROUP BY post_id
) 
SELECT 
    p.*,
    COALESCE(c.comment_cnt, 0) AS comment_cnt,
    COALESCE(l.like_cnt, 0) AS like_cnt
FROM (
    SELECT 
        post.id, post. title, post.uploaded_at, post.edited_at, 
        post.cover, post.category_id
    FROM post 
    WHERE is_public = true
    ORDER BY post.uploaded_at DESC OFFSET {offset} LIMIT {limit}
) AS p
LEFT JOIN comments c ON p.id = c.post_id
LEFT JOIN likes l ON p.id = l.post_id;
                ")
                    .ToList()
                    .AsEnumerable();
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return null;
            }
        }

        public IEnumerable<PostsLikesCommentsFilteredByCategory>? GetCategoryPosts(int offset, int limit, string category)
        {
            try
            {
                return _mainContext.PostsLikesCommentsFilteredByCategory.FromSqlInterpolated(@$"
	WITH likes AS (
		SELECT post_id, COUNT(*) AS like_cnt
		FROM liked_post
		GROUP BY post_id
	),
	comments AS (
		SELECT 
			post_id, 
			COUNT(*) AS comment_cnt
		FROM comment
		WHERE is_deleted = false
		GROUP BY post_id
	) 
	SELECT 
		p.*,
		COALESCE(c.comment_cnt, 0) AS comment_cnt,
		COALESCE(l.like_cnt, 0) AS like_cnt
	FROM (
		SELECT 
			post.id, post. title, post.uploaded_at, post.edited_at, 
			post.cover, post.category_id
		FROM post 
		WHERE is_public = true AND post.category_id = {category}
		ORDER BY post.uploaded_at DESC OFFSET {offset} LIMIT {limit}
	) AS p
	LEFT JOIN comments c ON p.id = c.post_id
	LEFT JOIN likes l ON p.id = l.post_id;
                ")
                    .ToList()
                    .AsEnumerable();
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return null;
            }
        }

        public PostLikesHasLiked? GetPostWithHasLiked(Guid post_id, Guid account_id)
        {
            try
            {
                return _mainContext.PostLikesHasLiked.FromSqlInterpolated(@$"
WITH likes_and_has_liked AS (
    SELECT 
        post_id, 
        COUNT(*) AS like_cnt,
        COUNT(DISTINCT CASE WHEN account_id = {account_id}
            THEN account_id END) > 0 AS has_liked
    FROM liked_post
    WHERE post_id = {post_id}
    GROUP BY post_id
)
SELECT 
    p.*,
    COALESCE(l.like_cnt, 0) AS like_cnt,
    COALESCE(l.has_liked, false) AS has_liked
FROM (
    SELECT 
        post.id, post. title, post.content, post.uploaded_at, post.edited_at, 
        post.cover, post.category_id
    FROM post 
    WHERE post.id = {post_id} AND is_public = true
) as p
LEFT JOIN likes_and_has_liked AS l ON p.id = l.post_id;
                ")
                    .ToList()
                    .FirstOrDefault();
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return null;
            }
        }

        public PostLikes? GetPost(Guid post_id)
        {
            try
            {
                return _mainContext.PostLikes.FromSqlInterpolated(@$"
WITH likes AS (
    SELECT 
        post_id, 
        COUNT(*) AS like_cnt
    FROM liked_post
    WHERE post_id = {post_id}
    GROUP BY post_id
)
SELECT 
    p.*,
    COALESCE(l.like_cnt, 0) AS like_cnt
FROM (
    SELECT 
        post.id, post. title, post.content, post.uploaded_at, post.edited_at, 
        post.cover, post.category_id
    FROM post 
    WHERE post.id = {post_id} AND is_public = true
) as p
LEFT JOIN likes AS l ON p.id = l.post_id;
                ")
                    .ToList()
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

        public IEnumerable<CommentsLikesHasLiked>? GetCommentsWithHasLiked(Guid post_id, Guid account_id)
        {
            try
            {
                return _mainContext.CommentsLikesHasLiked.FromSqlInterpolated(@$"
WITH likes_has_liked AS (
    SELECT 
        comment_id, 
        COUNT(comment_id) AS like_cnt,
        COUNT(DISTINCT CASE WHEN account_id = {account_id}
            THEN account_id END) > 0 AS has_liked
    FROM liked_comment
    GROUP BY comment_id
)
SELECT 
    c.id, c.parent_comment_id, a.avatar, a.email, c.content, c.uploaded_at, c.is_deleted,
    COALESCE(l.like_cnt, 0) AS like_cnt,
    COALESCE(l.has_liked, false) AS has_liked
FROM (
    SELECT 
        comment.id, 
        comment.parent_comment_id, 
        comment.account_id,
        comment.content, 
        comment.uploaded_at, 
        comment.is_deleted
    FROM comment
    WHERE post_id = {post_id}
) AS c
LEFT JOIN likes_has_liked AS l ON l.comment_id = c.id
JOIN account AS a ON a.id = c.account_id;
                ")
                    .ToList();
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return null;
            }
        }

        public IEnumerable<CommentsLikes>? GetComments(Guid post_id)
        {
            try
            {
                return _mainContext.CommentsLikes.FromSqlInterpolated(@$"
WITH likes_has_liked AS (
    SELECT 
        comment_id, 
        COUNT(comment_id) AS like_cnt
    FROM liked_comment
    GROUP BY comment_id
)
SELECT 
    c.id, c.parent_comment_id, a.avatar, a.email, c.content, c.uploaded_at, c.is_deleted,
    COALESCE(l.like_cnt, 0) AS like_cnt
FROM (
    SELECT 
        comment.id, 
        comment.parent_comment_id, 
        comment.account_id,
        comment.content, 
        comment.uploaded_at, 
        comment.is_deleted
    FROM comment
    WHERE post_id = {post_id}
) AS c
LEFT JOIN likes_has_liked AS l ON l.comment_id = c.id
JOIN account AS a ON a.id = c.account_id;
                ")
                    .ToList();
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
                return _mainContext.PostSummary.FromSql(@$"
SELECT id, title, uploaded_at, edited_at FROM post;
                ")
                    .ToList()
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

        public async Task<bool> UpdateEditedAtAsync(PostWithMetadata post)
        {
            try
            {
                return await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
UPDATE post 
SET 
    edited_at = CURRENT_TIMESTAMP
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

        public async Task<bool> SetEditedAtAsNullAsync(PostWithMetadata post)
        {
            try
            {
                return await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
UPDATE post 
SET 
    edited_at = null
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

        public async Task<bool> UpdateUploadedAtAsync(PostWithMetadata post)
        {
            try
            {
                return await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
UPDATE post 
SET 
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

        public async Task<bool> UpdatePostAsync(PostWithMetadata post)
        {
            try
            {
                return await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
UPDATE post 
SET 
    title = {post.Title},
    content = {post.Content},
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

        public StaticLikePostLikesHasLiked? GetStaticLikePostWithHasLiked(Guid post_id, Guid account_id)
        {
            try
            {
                return _mainContext.StaticLikePostLikesHasLiked.FromSqlInterpolated(@$"
WITH likes_and_has_liked AS (
    SELECT 
        post_id, 
        COUNT(*) AS like_cnt,
        COUNT(DISTINCT CASE WHEN account_id = {account_id}
            THEN account_id END) > 0 AS has_liked
    FROM liked_post
    WHERE post_id = {post_id}
    GROUP BY post_id
)
SELECT 
    p.*,
    COALESCE(l.like_cnt, 0) AS like_cnt,
    COALESCE(l.has_liked, false) AS has_liked
FROM (
    SELECT 
        post.id, post. title, post.content, post.uploaded_at, post.edited_at, 
        post.cover, post.category_id
    FROM post 
    WHERE post.id = {post_id}
) as p
LEFT JOIN likes_and_has_liked AS l ON p.id = l.post_id;
                ")
                    .ToList()
                    .FirstOrDefault();
            }
            catch (Exception e)
            {
                _logger.LogInformation($"{e.Source}: {e.Message}");
                return null;
            }
        }

        public StaticLikePostLikes? GetStaticLikePost(Guid post_id)
        {
            try
            {
                return _mainContext.StaticLikePostLikes.FromSqlInterpolated(@$"
WITH likes AS (
    SELECT 
        post_id, 
        COUNT(*) AS like_cnt
    FROM liked_post
    WHERE post_id = {post_id}
    GROUP BY post_id
)
SELECT 
    p.*,
    COALESCE(l.like_cnt, 0) AS like_cnt
FROM (
    SELECT 
        post.id, post. title, post.content, post.uploaded_at, post.edited_at, 
        post.cover, post.category_id
    FROM post 
    WHERE post.id = {post_id}
) as p
LEFT JOIN likes AS l ON p.id = l.post_id;
                ")
                    .ToList()
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