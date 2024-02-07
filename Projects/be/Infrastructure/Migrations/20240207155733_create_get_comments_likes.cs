using System;
using Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    [DbContext(typeof(MainContext))]
    [Migration("20240207155733_create_get_comments_likes")]
    public partial class create_get_comments_likes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
CREATE OR REPLACE FUNCTION get_comments_likes(target_post_id UUID)
RETURNS TABLE (
	id UUID,
	parent_comment_id UUID,
	avatar VARCHAR(256),
	email VARCHAR(254),
	content TEXT,
	uploaded_at TIMESTAMP WITH TIME ZONE,
	edited_at TIMESTAMP WITH TIME ZONE,
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
		c.id, c.parent_comment_id, a.avatar, a.email, c.content, c.uploaded_at, c.edited_at, c.is_deleted,
		COALESCE(l.like_cnt, 0) AS like_cnt
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
DROP FUNCTION get_comments_likes;
            ");
        }
    }
}
