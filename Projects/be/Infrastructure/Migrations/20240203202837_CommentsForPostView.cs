using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CommentsForPostView : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
CREATE VIEW comments_for_post AS 
SELECT comment.id, comment.content, comment.uploaded_at, comment.parent_comment_id, comment.post_id, comment.is_deleted, account.email
FROM comment
JOIN account ON account.id = comment.account_id;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
DROP VIEW comments_for_post;
            ");
        }
    }
}
