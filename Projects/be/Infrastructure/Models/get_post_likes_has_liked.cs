namespace Infrastructure.Models;

public class get_post_likes_has_liked
{
    public Guid id { get; set; }
    public string title { get; set; } = string.Empty;
    public string content { get; set; } = string.Empty;
    public DateTime uploaded_at { get; set; }
    public DateTime? edited_at { get; set; }
    public string? cover { get; set; }
    public string? category_id { get; set; }
    public long like_cnt { get; set; }
    public bool has_liked { get; set; }

    public get_post_likes_has_liked() {
        
    } 
    public get_post_likes_has_liked(get_post_likes postWithoutHasLiked) {
        this.id = postWithoutHasLiked.id;
        this.title = postWithoutHasLiked.title;
        this.content = postWithoutHasLiked.content;
        this.uploaded_at= postWithoutHasLiked.uploaded_at;
        this.edited_at= postWithoutHasLiked.edited_at;
        this.cover = postWithoutHasLiked.cover;
        this.category_id = postWithoutHasLiked.category_id;
        this.like_cnt = postWithoutHasLiked.like_cnt;
        this.has_liked = false;
    }
}
