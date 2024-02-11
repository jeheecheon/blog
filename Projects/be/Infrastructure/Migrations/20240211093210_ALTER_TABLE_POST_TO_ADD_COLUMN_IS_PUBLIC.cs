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
    [Migration("20240211093210_ALTER_TABLE_POST_TO_ADD_COLUMN_IS_PUBLIC")]
    public partial class ALTER_TABLE_POST_TO_ADD_COLUMN_IS_PUBLIC : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
ALTER TABLE post
    ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT false
           ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
ALTER TABLE post
	DROP COLUMN IF EXISTS is_public;
           ");
        }
    }
}
