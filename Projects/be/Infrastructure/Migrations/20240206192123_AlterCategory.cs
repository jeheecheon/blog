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
    [Migration("20240206192123_AlterCategory")]
    public partial class AlterCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
ALTER TABLE post DROP COLUMN category_id;
ALTER TABLE post ADD COLUMN category_id VARCHAR(30);
TRUNCATE TABLE category;
ALTER TABLE category DROP COLUMN parent_category_id;
ALTER TABLE category DROP COLUMN id;
ALTER TABLE category ADD COLUMN id VARCHAR(30) PRIMARY KEY;
ALTER TABLE category ADD COLUMN parent_category_id VARCHAR(30);
ALTER TABLE category ADD FOREIGN KEY (parent_category_id) REFERENCES category(id);
ALTER TABLE post ADD FOREIGN KEY (category_id) REFERENCES category(id);
ALTER TABLE category DROP COLUMN name;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
ALTER TABLE post DROP COLUMN category_id;
ALTER TABLE post ADD COLUMN category_id INT;
TRUNCATE TABLE category;
ALTER TABLE category DROP COLUMN parent_category_id;
ALTER TABLE category DROP COLUMN id;
ALTER TABLE category ADD COLUMN id SERIAL;
ALTER TABLE category ADD COLUMN parent_category_id INT;
ALTER TABLE category ADD PRIMARY KEY (id);
ALTER TABLE category ADD FOREIGN KEY (parent_category_id) REFERENCES category(id);
ALTER TABLE post ADD FOREIGN KEY (category_id) REFERENCES category(id);
ALTER TABLE category ADD COLUMN name VARCHAR(40) NOT NULL UNIQUE;
            ");
        }
    }
}
