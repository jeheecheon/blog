namespace Infrastructure.Models;

public class get_post_likes
{
    public Guid id { get; set; }
    public string title { get; set; } = string.Empty;
    public string content { get; set; } = string.Empty;
    public DateTime uploaded_at { get; set; }
    public DateTime? edited_at { get; set; }
    public string? cover { get; set; }
    public string? category_id { get; set; }
    public long like_cnt { get; set; }
}
