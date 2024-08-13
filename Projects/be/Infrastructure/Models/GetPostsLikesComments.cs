using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models;

[Table("get_posts_likes_comments")]
public class PostsLikesComments
{
    [Column("id")]
    public Guid Id { get; set; }

    [Column("title")]
    public string Title { get; set; } = string.Empty;

    [Column("uploaded_at")]
    public DateTime UploadedAt { get; set; }

    [Column("edited_at")]
    public DateTime? EditedAt { get; set; }

    [Column("cover")]
    public string? Cover { get; set; }

    [Column("category_id")]
    public string? CategoryId { get; set; }

    [Column("comment_cnt")]
    public long CommentCnt { get; set; }

    [Column("like_cnt")]
    public long LikeCnt { get; set; }

    [Column("content")]
    public string Content { get; set; } = string.Empty;
}
