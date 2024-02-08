using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Infrastructur.Models;

[Table("category")]
[PrimaryKey(nameof(Id))]
public partial class Category
{
    [Column("is_bottom_level")]
    public bool IsBottomLevel { get; set; }

    [Column("id")]
    public string Id { get; set; } = null!;

    [Column("parent_category_id")]
    [ForeignKey(nameof(ParentCategory))]
    public string? ParentCategoryId { get; set; }

    public virtual Category? ParentCategory { get; set; }

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
}
