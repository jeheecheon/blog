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
    [Migration("20240218210112_DELETE_ALL_FUNCTIONS")]
    public partial class DELETE_ALL_FUNCTIONS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
DROP FUNCTION IF EXISTS get_posts_likes_comments_filtered_by_category;
DROP FUNCTION IF EXISTS get_posts_likes_comments;
DROP FUNCTION IF EXISTS get_static_like_post_likes;
DROP FUNCTION IF EXISTS get_static_like_post_likes_has_liked;
DROP FUNCTION IF EXISTS get_post_likes;
DROP FUNCTION IF EXISTS get_post_likes_has_liked;
DROP FUNCTION IF EXISTS get_comments_likes;
DROP FUNCTION IF EXISTS get_comments_likes_has_liked;
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


DROP FUNCTION IF EXISTS get_static_like_post_likes;
CREATE OR REPLACE FUNCTION get_static_like_post_likes(target_post_id UUID)
RETURNS TABLE (
	id UUID,
	title VARCHAR(50), 
	content TEXT, 
	uploaded_at TIMESTAMP WITH TIME ZONE,
	edited_at TIMESTAMP WITH TIME ZONE, 
	cover VARCHAR(256), 
	category_id VARCHAR(30),
	like_cnt BIGINT
) AS $$
BEGIN
	RETURN QUERY
	WITH likes AS (
		SELECT 
			post_id, 
			COUNT(*) AS like_cnt
		FROM liked_post
		WHERE post_id = target_post_id
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
		WHERE post.id = target_post_id
	) as p
	LEFT JOIN likes AS l ON p.id = l.post_id;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS get_static_like_post_likes_has_liked;
CREATE OR REPLACE FUNCTION get_static_like_post_likes_has_liked(target_post_id UUID, target_account_id UUID)
RETURNS TABLE (
	id UUID,
	title VARCHAR(50), 
	content TEXT, 
	uploaded_at TIMESTAMP WITH TIME ZONE,
	edited_at TIMESTAMP WITH TIME ZONE, 
	cover VARCHAR(256), 
	category_id VARCHAR(30),
	like_cnt BIGINT,
	has_liked BOOLEAN
) AS $$
BEGIN
	RETURN QUERY
	WITH likes_and_has_liked AS (
		SELECT 
			post_id, 
			COUNT(*) AS like_cnt,
			COUNT(DISTINCT CASE WHEN account_id = target_account_id
				THEN account_id END) > 0 AS has_liked
		FROM liked_post
		WHERE post_id = target_post_id
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
		WHERE post.id = target_post_id
	) as p
	LEFT JOIN likes_and_has_liked AS l ON p.id = l.post_id;
END;
$$ LANGUAGE plpgsql;	


DROP FUNCTION IF EXISTS get_post_likes;
CREATE OR REPLACE FUNCTION get_post_likes(target_post_id UUID)
RETURNS TABLE (
	id UUID,
	title VARCHAR(50), 
	content TEXT, 
	uploaded_at TIMESTAMP WITH TIME ZONE,
	edited_at TIMESTAMP WITH TIME ZONE, 
	cover VARCHAR(256), 
	category_id VARCHAR(30),
	like_cnt BIGINT
) AS $$
BEGIN
	RETURN QUERY
	WITH likes AS (
		SELECT 
			post_id, 
			COUNT(*) AS like_cnt
		FROM liked_post
		WHERE post_id = target_post_id
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
		WHERE post.id = target_post_id AND is_public = true
	) as p
	LEFT JOIN likes AS l ON p.id = l.post_id;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS get_post_likes_has_liked;
CREATE OR REPLACE FUNCTION get_post_likes_has_liked(target_post_id UUID, target_account_id UUID)
RETURNS TABLE (
	id UUID,
	title VARCHAR(50), 
	content TEXT, 
	uploaded_at TIMESTAMP WITH TIME ZONE,
	edited_at TIMESTAMP WITH TIME ZONE, 
	cover VARCHAR(256), 
	category_id VARCHAR(30),
	like_cnt BIGINT,
	has_liked BOOLEAN
) AS $$
BEGIN
	RETURN QUERY
	WITH likes_and_has_liked AS (
		SELECT 
			post_id, 
			COUNT(*) AS like_cnt,
			COUNT(DISTINCT CASE WHEN account_id = target_account_id
				THEN account_id END) > 0 AS has_liked
		FROM liked_post
		WHERE post_id = target_post_id
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
		WHERE post.id = target_post_id AND is_public = true
	) as p
	LEFT JOIN likes_and_has_liked AS l ON p.id = l.post_id;
END;
$$ LANGUAGE plpgsql;	



DROP FUNCTION IF EXISTS get_comments_likes;
CREATE OR REPLACE FUNCTION get_comments_likes(target_post_id UUID)
RETURNS TABLE (
	id UUID,
	parent_comment_id UUID,
	avatar VARCHAR(256),
	email VARCHAR(254),
	content TEXT,
	uploaded_at TIMESTAMP WITH TIME ZONE,
	is_deleted BOOLEAN,
	like_cnt BIGINT
) AS $$
BEGIN
	RETURN QUERY
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
		WHERE post_id = target_post_id
	) AS c
	LEFT JOIN likes_has_liked AS l ON l.comment_id = c.id
	JOIN account AS a ON a.id = c.account_id;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS get_comments_likes_has_liked;
CREATE OR REPLACE FUNCTION get_comments_likes_has_liked(target_post_id UUID, target_account_id UUID)
RETURNS TABLE (
	id UUID,
	parent_comment_id UUID,
	avatar VARCHAR(256),
	email VARCHAR(254),
	content TEXT,
	uploaded_at TIMESTAMP WITH TIME ZONE,
	is_deleted BOOLEAN,
	like_cnt BIGINT,
	has_liked BOOLEAN
) AS $$
BEGIN
	RETURN QUERY
	WITH likes_has_liked AS (
		SELECT 
			comment_id, 
			COUNT(comment_id) AS like_cnt,
			COUNT(DISTINCT CASE WHEN account_id = target_account_id
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
		WHERE post_id = target_post_id
	) AS c
	LEFT JOIN likes_has_liked AS l ON l.comment_id = c.id
	JOIN account AS a ON a.id = c.account_id;
END;
$$ LANGUAGE plpgsql;
            ");
        }
    }
}
