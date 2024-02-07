using Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
	[DbContext(typeof(MainContext))]
	[Migration("20240207153521_create_get_post_likes_function")]
    public partial class create_get_post_likes_function : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
CREATE OR REPLACE FUNCTION get_post_likes(target_post_id UUID)
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
	FROM (SELECT * FROM post WHERE post.id = target_post_id) as p
	LEFT JOIN likes AS l ON p.id = l.post_id;
END;
$$ LANGUAGE plpgsql;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
DROP FUNCTION get_post_likes;
            ");
        }
    }
}
