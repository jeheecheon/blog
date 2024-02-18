using System;
using Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    [DbContext(typeof(MainContext))]
    [Migration("20240218162905_ALTER_FUNCTION_FETCHING_POSTS")]
    public partial class ALTER_FUNCTION_FETCHING_POSTS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
DROP FUNCTION IF EXISTS get_posts_likes_comments_filtered_by_category;
CREATE OR REPLACE FUNCTION get_posts_likes_comments_filtered_by_category(offset_val INT, limit_val INT, category_to_filter TEXT)
RETURNS TABLE (
	id UUID,
	title VARCHAR(50),
	uploaded_at TIMESTAMP WITH TIME ZONE,
	edited_at TIMESTAMP WITH TIME ZONE, 
	cover VARCHAR(256), 
	category_id VARCHAR(30),
	comment_cnt BIGINT, 
	like_cnt BIGINT
) AS $$
BEGIN
	RETURN QUERY
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
		WHERE is_public = true AND post.category_id = category_to_filter
		ORDER BY post.uploaded_at DESC OFFSET offset_val LIMIT limit_val
	) AS p
	LEFT JOIN comments c ON p.id = c.post_id
	LEFT JOIN likes l ON p.id = l.post_id;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS get_posts_likes_comments;
CREATE OR REPLACE FUNCTION get_posts_likes_comments(offset_val INT, limit_val INT)
RETURNS TABLE (
	id UUID,
	title VARCHAR(50), 
	uploaded_at TIMESTAMP WITH TIME ZONE,
	edited_at TIMESTAMP WITH TIME ZONE, 
	cover VARCHAR(256), 
	category_id VARCHAR(30),
	comment_cnt BIGINT, 
	like_cnt BIGINT
) AS $$
BEGIN
	RETURN QUERY
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
		ORDER BY post.uploaded_at DESC OFFSET offset_val LIMIT limit_val
	) AS p
	LEFT JOIN comments c ON p.id = c.post_id
	LEFT JOIN likes l ON p.id = l.post_id;
END;
$$ LANGUAGE plpgsql;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
DROP FUNCTION IF EXISTS get_posts_likes_comments_filtered_by_category;
CREATE OR REPLACE FUNCTION get_posts_likes_comments_filtered_by_category(offset_val INT, limit_val INT, category_to_filter TEXT)
RETURNS TABLE (
	id UUID,
	title VARCHAR(50),
	content TEXT, 
	uploaded_at TIMESTAMP WITH TIME ZONE,
	edited_at TIMESTAMP WITH TIME ZONE, 
	cover VARCHAR(256), 
	category_id VARCHAR(30),
	comment_cnt BIGINT, 
	like_cnt BIGINT
) AS $$
BEGIN
	RETURN QUERY
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
			post.id, post. title, post.content, post.uploaded_at, post.edited_at, 
			post.cover, post.category_id
		FROM post 
		WHERE is_public = true AND post.category_id = category_to_filter
		ORDER BY post.uploaded_at DESC OFFSET offset_val LIMIT limit_val
	) AS p
	LEFT JOIN comments c ON p.id = c.post_id
	LEFT JOIN likes l ON p.id = l.post_id;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS get_posts_likes_comments;
CREATE OR REPLACE FUNCTION get_posts_likes_comments(offset_val INT, limit_val INT)
RETURNS TABLE (
	id UUID,
	title VARCHAR(50), 
	content TEXT, 
	uploaded_at TIMESTAMP WITH TIME ZONE,
	edited_at TIMESTAMP WITH TIME ZONE, 
	cover VARCHAR(256), 
	category_id VARCHAR(30),
	comment_cnt BIGINT, 
	like_cnt BIGINT
) AS $$
BEGIN
	RETURN QUERY
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
			post.id, post. title, post.content, post.uploaded_at, post.edited_at, 
			post.cover, post.category_id
		FROM post 
		WHERE is_public = true
		ORDER BY post.uploaded_at DESC OFFSET offset_val LIMIT limit_val
	) AS p
	LEFT JOIN comments c ON p.id = c.post_id
	LEFT JOIN likes l ON p.id = l.post_id;
END;
$$ LANGUAGE plpgsql;
            ");
        }
    }
}
