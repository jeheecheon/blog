using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructure.Models;

[Table("get_post_likes_has_liked")]
public class PostLikesHasLiked
{
    [Column("id")]
    public Guid Id { get; set; }

    [Column("title")]
    public string Title { get; set; } = string.Empty;

    [Column("content")]
    public string Content { get; set; } = string.Empty;

    [Column("uploaded_at")]
    public DateTime UploadedAt { get; set; }

    [Column("edited_at")]
    public DateTime? EditedAt { get; set; }

    [Column("cover")]
    public string? Cover { get; set; }

    [Column("category_id")]
    public string? CategoryId { get; set; }

    [Column("like_cnt")]
    public long LikeCnt { get; set; }

    [Column("has_liked")]
    public bool HasLiked { get; set; }

    public PostLikesHasLiked()
    {

    }
    public PostLikesHasLiked(PostLikes postWithoutHasLiked)
    {
        this.Id = postWithoutHasLiked.Id;
        this.Title = postWithoutHasLiked.Title;
        this.Content = postWithoutHasLiked.Content;
        this.UploadedAt = postWithoutHasLiked.UploadedAt;
        this.EditedAt = postWithoutHasLiked.EditedAt;
        this.Cover = postWithoutHasLiked.Cover;
        this.CategoryId = postWithoutHasLiked.CategoryId;
        this.LikeCnt = postWithoutHasLiked.LikeCnt;
        this.HasLiked = false;
    }
}
