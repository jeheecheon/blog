using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructur.Models;

[Table("category")]
public partial class _category
{
    public bool is_bottom_level { get; set; }

    [Key]
    public string id { get; set; } = null!;

    [ForeignKey(nameof(parent_category))]
    public string? parent_category_id { get; set; }

    public virtual ICollection<_category> Inverseparent_category { get; set; } = new List<_category>();

    public virtual _category? parent_category { get; set; }

    public virtual ICollection<_post> posts { get; set; } = new List<_post>();
}
