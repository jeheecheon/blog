using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Infrastructur.Models;

[Table("liked_comment")]
[PrimaryKey(nameof(CommentId), nameof(AccountId))]
public partial class LikedComment
{
    [Column("comment_id")]
    [ForeignKey(nameof(Comment))]
    public Guid CommentId { get; set; }

    [Column("account_id")]
    [ForeignKey(nameof(Account))]
    public Guid AccountId { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual Comment Comment { get; set; } = null!;
}
