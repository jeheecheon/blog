namespace Core.DTOs;

public class CommentUploadRequestDto
{
    public Guid? parent_comment_id { get; set; }
    public string content { get; set; } = string.Empty;
}
