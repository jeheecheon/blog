using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructur.Models;

public partial class PostWithMetadata
{
    [Column("id")]
    public Guid Id { get; set; }

    [Column("title")]
    public string Title { get; set; } = null!;

    [Column("content")]
    public string Content { get; set; } = null!;

    [Column("uploaded_at")]
    public DateTime UploadedAt { get; set; }

    [Column("edited_at")]
    public DateTime? EditedAt { get; set; }

    [Column("cover")]
    public string? Cover { get; set; }

    [Column("category_id")]
    [ForeignKey(nameof(Category))]
    public string? CategoryId { get; set; }

    [Column("is_public")]
    public bool? IsPublic { get; set; }
}
