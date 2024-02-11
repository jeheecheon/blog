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
    [Migration("20240211150808_CREATE_FUNCTION_FOR_FETCHING_STATIC_LIKE_POST")]
    public partial class CREATE_FUNCTION_FOR_FETCHING_STATIC_LIKE_POST : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
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
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
DROP FUNCTION IF EXISTS get_static_like_post_likes;
DROP FUNCTION IF EXISTS get_static_like_post_likes_has_liked;
            ");
        }
    }
}
