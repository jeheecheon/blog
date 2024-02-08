
namespace Core.DTOs;

public class PostUploadRequestDto
{
    public string title { get; set; } = string.Empty;
    public string category_id { get; set; } = string.Empty;
    public string content { get; set; } = string.Empty;
}