namespace Infrastructure.Models;

public class PostLikesComments
{
    public Guid id { get; set; }
    public string title { get; set; }
    public DateTime uploaded_at { get; set; }
    public DateTime? edited_at { get; set; }
    public string? cover { get; set; }
    public string? category_id { get; set; }
    public string content { get; set; }
    public long comment_cnt { get; set; }
    public long like_cnt { get; set; }
}
