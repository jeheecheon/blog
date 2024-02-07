namespace Infrastructure.Models;

public class get_posts_likes_comments_filted_by_category
{
    public Guid id { get; set; }
    public string title { get; set; } = string.Empty;
    public DateTime uploaded_at { get; set; }
    public DateTime? edited_at { get; set; }
    public string? cover { get; set; }
    public string? category_id { get; set; }
    public string content { get; set; } = string.Empty;
    public long comment_cnt { get; set; }
    public long like_cnt { get; set; }
}
