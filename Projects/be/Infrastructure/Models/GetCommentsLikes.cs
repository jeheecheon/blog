using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models;

[Table("get_comments_likes")]
public class GetCommentsLikes
{
    [Column("id")]
    public Guid Id { get; set; }

    [Column("parent_comment_id")]
    public Guid? ParentCommentId { get; set; }

    [Column("content")]
    public string Content { get; set; } = string.Empty;

    [Column("uploaded_at")]
    public DateTime UploadedAt { get; set; }

    [Column("is_deleted")]
    public bool IsDeleted { get; set; }

    [Column("like_cnt")]
    public long LikeCnt { get; set; }

    [Column("email")]
    public string Email { get; set; } = string.Empty;

    [Column("avatar")]
    public string? Avatar { get; set; }
}
