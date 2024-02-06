namespace Infrastructure.Models;

public class get_post_likes_has_liked
{
    public Guid id { get; set; }
    public string title { get; set; }
    public string content { get; set; }
    public DateTime uploaded_at { get; set; }
    public DateTime? edited_at { get; set; }
    public string? cover { get; set; }
    public string? category_id { get; set; }
    public long like_cnt { get; set; }
    public bool has_liked { get; set; }
}
