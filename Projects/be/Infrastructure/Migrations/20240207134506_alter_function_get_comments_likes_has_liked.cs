using System;
using Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    [DbContext(typeof(MainContext))]
    [Migration("20240207134506_alter_function_get_comments_likes_has_liked")]
    public partial class alter_function_get_comments_likes_has_liked : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
CREATE OR REPLACE FUNCTION get_comments_likes_has_liked(target_post_id UUID, target_account_id UUID)
RETURNS TABLE (
	id UUID,
	parent_comment_id UUID,
	avatar VARCHAR(256),
	email VARCHAR(254),
	content TEXT,
	uploaded_at TIMESTAMP WITH TIME ZONE,
	edited_at TIMESTAMP WITH TIME ZONE,
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
		c.id, c.parent_comment_id, a.avatar, a.email, c.content, c.uploaded_at, c.edited_at, c.is_deleted,
		COALESCE(l.like_cnt, 0) AS like_cnt,
		COALESCE(l.has_liked, false) AS has_liked
	FROM (
		SELECT 
			comment.id, 
			comment.parent_comment_id, 
			comment.account_id,
			comment.content, 
			comment.uploaded_at, 
			comment.edited_at, 
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
CREATE OR REPLACE FUNCTION get_comments_likes_has_liked(target_post_id UUID, target_account_id UUID)
RETURNS TABLE (
	parent_comment_id UUID,
	content TEXT,
	uploaded_at TIMESTAMP WITH TIME ZONE,
	edited_at TIMESTAMP WITH TIME ZONE,
	is_deleted BOOLEAN,
	like_cnt BIGINT,
	has_liked BOOLEAN
) AS $$
BEGIN
	RETURN QUERY
	WITH likes_has_liked AS (
		SELECT 
			comment_id, 
			COUNT(*) AS like_cnt,
			COUNT(DISTINCT CASE WHEN account_id = target_account_id
				THEN account_id END) > 0 AS has_liked
		FROM liked_comment
		WHERE account_id = target_account_id
		GROUP BY comment_id
	)
	SELECT 
		c.parent_comment_id, c.content, c.uploaded_at, c.edited_at, c.is_deleted,
		COALESCE(l.like_cnt, 0) AS like_cnt,
		COALESCE(l.has_liked, false) AS has_liked

	FROM (
		SELECT 
			comment.id, 
			comment.parent_comment_id, 
			comment.content, 
			comment.uploaded_at, 
			comment.edited_at, 
			comment.is_deleted
		FROM comment
		WHERE post_id = target_post_id
	) AS c
	LEFT JOIN likes_has_liked AS l ON l.comment_id = c.id;
END;
$$ LANGUAGE plpgsql;
            ");
        }
    }
}
