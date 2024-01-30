using System;
using System.Collections.Generic;

namespace Infrastructur.Models;

public partial class role
{
    public int id { get; set; }

    public string name { get; set; } = null!;

    public virtual ICollection<account> accounts { get; set; } = new List<account>();
}
