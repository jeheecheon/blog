using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Infrastructur.Models;

[PrimaryKey(nameof(Id))]
[Table("comment")]
public partial class Comment
{
    [Column("id")]
    public Guid Id { get; set; }

    [Column("parent_comment_id")]
    [ForeignKey(nameof(ParentComment))]
    public Guid? ParentCommentId { get; set; }

    [Column("account_id")]
    [ForeignKey(nameof(Account))]
    public Guid AccountId { get; set; }

    [Column("post_id")]
    [ForeignKey(nameof(Post))]
    public Guid PostId { get; set; }

    [Column("content")]
    public string Content { get; set; } = null!;

    [Column("uploaded_at")]
    public DateTime UploadedAt { get; set; }

    [Column("is_deleted")]
    public bool IsDeleted { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual ICollection<LikedComment> LikedComments { get; set; } = new List<LikedComment>();

    public virtual Comment? ParentComment { get; set; }

    public virtual Post Post { get; set; } = null!;
}
