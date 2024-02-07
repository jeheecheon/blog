using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Infrastructur.Models;

[PrimaryKey(nameof(account_id), nameof(role_id))]
public partial class account_role
{
    public Guid account_id { get; set; }

    public int role_id { get; set; }

    public virtual ICollection<role> roles { get; set; } = new List<role>();
    public virtual ICollection<account> account { get; set; } = new List<account>();

}
