using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructur.Models;

[Table("role")]
public partial class _role
{
    public int id { get; set; }

    public string name { get; set; } = null!;

    public virtual ICollection<account_role> account_roles { get; set; } = new List<account_role>();
}
