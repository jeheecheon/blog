namespace Infrastructure.Models;

public class get_comments_likes
{
    public Guid id { get; set; }
    public Guid? parent_comment_id { get; set; }
    public string content { get; set; }
    public DateTime uploaded_at { get; set; }
    public DateTime? edited_at { get; set; }
    public bool is_deleted { get; set; }
    public long like_cnt { get; set; }
    public string email { get; set; }
    public string? avatar { get; set; }
}
