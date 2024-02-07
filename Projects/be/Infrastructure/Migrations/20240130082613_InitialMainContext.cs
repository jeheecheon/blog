using Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    [DbContext(typeof(MainContext))]
    [Migration("20240130082613_InitialMainContext")]
    public partial class InitialMainContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
CREATE TABLE account (
	id UUID DEFAULT gen_random_uuid(),
	email VARCHAR(254) NOT NULL,
	normalized_email VARCHAR(254) UNIQUE NOT NULL,
	is_email_confirmed BOOL NOT NULL,
	avatar VARCHAR(256),
	created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE external_login_provider (
	id SERIAL,
	name VARCHAR(40) UNIQUE NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE external_authentication (
	provider_id INT,
	account_id_from_provider VARCHAR(256) UNIQUE ,
	account_id UUID NOT NULL,
	PRIMARY KEY (provider_id, account_id_from_provider),
	FOREIGN KEY (provider_id) REFERENCES external_login_provider (id) ON DELETE CASCADE,
	FOREIGN KEY (account_id) REFERENCES account (id) ON DELETE CASCADE
);

CREATE TABLE role (
	id SERIAL,
	name VARCHAR(30) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE account_role (
	account_id UUID,
	role_id INT,
	PRIMARY KEY (account_id, role_id),
	FOREIGN KEY (account_id) REFERENCES account (id) ON DELETE CASCADE,
	FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE
);

CREATE TABLE hashtag (
	id SERIAL,
	name VARCHAR(40) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE category (
	id SERIAL,
	parent_category_id INT,
	is_bottom_level BOOL NOT NULL,
	name VARCHAR(40) NOT NULL UNIQUE,
	PRIMARY KEY (id),
	FOREIGN KEY (parent_category_id) REFERENCES category (id) ON DELETE SET NULL
);

CREATE TABLE post (
	id UUID DEFAULT gen_random_uuid(),
	title VARCHAR(50) NOT NULL,
	content TEXT NOT NULL,
	uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	edited_at TIMESTAMP WITH TIME ZONE,
	category_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL
);

CREATE TABLE post_hashtag (
	post_id UUID,
	hashtag_id INT,
	PRIMARY KEY (post_id, hashtag_id),
	FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
	FOREIGN KEY (hashtag_id) REFERENCES hashtag(id) ON DELETE CASCADE
);

CREATE TABLE comment (
	id UUID DEFAULT gen_random_uuid(),
	parent_comment_id UUID,
	account_id UUID NOT NULL,
	post_id UUID NOT NULL,
	content TEXT NOT NULL,
	uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	edited_at TIMESTAMP WITH TIME ZONE,
	is_deleted BOOL NOT NULL DEFAULT false,
	PRIMARY KEY (id),
	FOREIGN KEY (parent_comment_id) REFERENCES comment (id) ON DELETE CASCADE,
	FOREIGN KEY (account_id) REFERENCES account (id) ON DELETE SET NULL,
	FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE
);

CREATE TABLE liked_comment (
	comment_id UUID,
	account_id UUID,
	created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (comment_id, account_id),
	FOREIGN KEY (comment_id) REFERENCES comment(id) ON DELETE CASCADE,
	FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE SET NULL
);

CREATE TABLE liked_post (
	post_id UUID,
	account_id UUID,
	created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (post_id, account_id),
	FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
	FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE SET NULL
);
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
DROP TABLE IF EXISTS liked_post;
DROP TABLE IF EXISTS liked_comment;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS post_hashtag;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS hashtag;
DROP TABLE IF EXISTS account_role;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS external_authentication;
DROP TABLE IF EXISTS external_login_provider;
DROP TABLE IF EXISTS account;
            ");
        }
    }
}
