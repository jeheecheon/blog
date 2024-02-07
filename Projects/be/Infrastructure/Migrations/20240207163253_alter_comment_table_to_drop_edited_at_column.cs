using Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    [DbContext(typeof(MainContext))]
    [Migration("20240207163253_alter_comment_table_to_drop_edited_at_column")]
    public partial class alter_comment_table_to_drop_edited_at_column : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
ALTER TABLE comment
DROP COLUMN edited_at;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
ALTER TABLE comment
ADD COLUMN edited_at TIMESTAMP WITH TIME ZONE;
            ");
        }
    }
}
