using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Infrastructur.Models;

[Table("liked_post")]
[PrimaryKey(propertyName: nameof(PostId), nameof(AccountId))]
public partial class LikedPost
{
    [Column("post_id")]
    [ForeignKey(nameof(Post))]
    public Guid PostId { get; set; }

    [Column("account_id")]
    [ForeignKey(nameof(Account))]
    public Guid AccountId { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual Post Post { get; set; } = null!;
}
