using System;
using System.Collections.Generic;

namespace Infrastructur.Models;

public partial class category
{
    public bool is_bottom_level { get; set; }

    public string id { get; set; } = null!;

    public string? parent_category_id { get; set; }

    public virtual ICollection<category> Inverseparent_category { get; set; } = new List<category>();

    public virtual category? parent_category { get; set; }

    public virtual ICollection<post> posts { get; set; } = new List<post>();
}
