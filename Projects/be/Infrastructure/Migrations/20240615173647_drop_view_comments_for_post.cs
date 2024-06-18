using Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(MainContext))]
    [Migration("20240615173647_drop_view_comments_for_post")]
    /// <inheritdoc />
    public partial class drop_view_comments_for_post : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
DROP VIEW comments_for_post;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
CREATE VIEW comments_for_post AS 
SELECT comment.id, comment.content, comment.uploaded_at, comment.parent_comment_id, comment.post_id, comment.is_deleted, account.email
FROM comment
JOIN account ON account.id = comment.account_id;
            ");
        }
    }
}
