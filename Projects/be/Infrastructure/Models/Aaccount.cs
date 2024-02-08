using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Infrastructur.Models;

[Table("account")]
[PrimaryKey(nameof(Id))]
public partial class Account
{
    [Column("id")]
    public Guid Id { get; set; }

    [Column("email")]
    public string Email { get; set; } = null!;

    [Column("normalized_email")]
    public string NormalizedEmail { get; set; } = null!;

    [Column("is_email_confirmed")]
    public bool IsEmailConfirmed { get; set; }

    [Column("avatar")]
    public string? Avatar { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<ExternalAuthentication> ExternalAuthentications { get; set; } = new List<ExternalAuthentication>();

    public virtual ICollection<LikedComment> LikedComments { get; set; } = new List<LikedComment>();

    public virtual ICollection<LikedPost> LikedPosts { get; set; } = new List<LikedPost>();

    public virtual ICollection<AccountRole> AccountRoles { get; set; } = new List<AccountRole>();
}
