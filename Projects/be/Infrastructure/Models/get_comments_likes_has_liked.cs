namespace Infrastructure.Models;

public class get_comments_likes_has_liked
{
    public Guid id { get; set; }
    public Guid? parent_comment_id { get; set; }
    public string content { get; set; } = string.Empty;
    public DateTime uploaded_at { get; set; }
    public bool is_deleted { get; set; }
    public long like_cnt { get; set; }
    public bool has_liked { get; set; }
    public string email { get; set; } = string.Empty;
    public string? avatar { get; set; }

    public get_comments_likes_has_liked()
    {

    }

    public get_comments_likes_has_liked(get_comments_likes commentWithoutHasLiked)
    {
        this.id = commentWithoutHasLiked.id;
        this.parent_comment_id = commentWithoutHasLiked.parent_comment_id;
        this.content = commentWithoutHasLiked.content;
        this.uploaded_at = commentWithoutHasLiked.uploaded_at;
        this.is_deleted = commentWithoutHasLiked.is_deleted;
        this.like_cnt = commentWithoutHasLiked.like_cnt;
        this.has_liked = false;
        this.email = commentWithoutHasLiked.email;
        this.avatar = commentWithoutHasLiked.avatar;
    }
}
