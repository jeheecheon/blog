using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructur.Models;

public partial class PostSummary
{
    [Column("id")]
    public Guid Id { get; set; }

    [Column("title")]
    public string Title { get; set; } = null!;

    [Column("uploaded_at")]
    public DateTime UploadedAt { get; set; }

    [Column("edited_at")]
    public DateTime? EditedAt { get; set; }
}
