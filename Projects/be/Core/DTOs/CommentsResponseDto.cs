namespace Core.DTOs;

public partial class CommentsResponseDto
{
    public Guid id { get; set; }

    public Guid? parent_comment_id { get; set; }

    public Guid post_id { get; set; }

    public string content { get; set; } = null!;

    public DateTime uploaded_at { get; set; }

    public DateTime? edited_at { get; set; }

    public bool is_deleted { get; set; }
}
