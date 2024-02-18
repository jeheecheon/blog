using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models;

public class CommentsLikesHasLiked
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

    [Column("has_liked")]
    public bool HasLiked { get; set; }

    [Column("email")]
    public string Email { get; set; } = string.Empty;

    [Column("avatar")]
    public string? Avatar { get; set; }

    public CommentsLikesHasLiked()
    {

    }

    public CommentsLikesHasLiked(CommentsLikes commentWithoutHasLiked)
    {
        this.Id = commentWithoutHasLiked.Id;
        this.ParentCommentId = commentWithoutHasLiked.ParentCommentId;
        this.Content = commentWithoutHasLiked.Content;
        this.UploadedAt = commentWithoutHasLiked.UploadedAt;
        this.IsDeleted = commentWithoutHasLiked.IsDeleted;
        this.LikeCnt = commentWithoutHasLiked.LikeCnt;
        this.HasLiked = false;
        this.Email = commentWithoutHasLiked.Email;
        this.Avatar = commentWithoutHasLiked.Avatar;
    }
}
