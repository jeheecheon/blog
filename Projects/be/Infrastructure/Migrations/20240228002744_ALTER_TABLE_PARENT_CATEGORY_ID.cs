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
    [Migration("20240228002744_ALTER_TABLE_PARENT_CATEGORY_ID")]
    public partial class ALTER_TABLE_PARENT_CATEGORY_ID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
ALTER TABLE category
DROP CONSTRAINT category_parent_category_id_fkey,
ADD CONSTRAINT category_parent_category_id_fkey
FOREIGN KEY (parent_category_id)
REFERENCES category(id)
ON UPDATE CASCADE
ON DELETE SET NULL;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
           migrationBuilder.Sql(@"
ALTER TABLE category
DROP CONSTRAINT category_parent_category_id_fkey,
ADD CONSTRAINT category_parent_category_id_fkey
FOREIGN KEY (parent_category_id)
REFERENCES category(id);
           ");
        }
    }
}
