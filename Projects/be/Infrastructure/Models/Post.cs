using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Infrastructur.Models;

[Table("post")]
[PrimaryKey(nameof(Id))]
public partial class Post
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

    public virtual Category? Category { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<LikedPost> LikedPosts { get; set; } = new List<LikedPost>();

    public virtual ICollection<Hashtag> Hashtags { get; set; } = new List<Hashtag>();
}
