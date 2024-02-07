using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Infrastructur.Models;

[PrimaryKey(nameof(account_id), nameof(role_id))]
public partial class account_role
{
    public Guid account_id { get; set; }

    public int role_id { get; set; }

    public virtual ICollection<_role> roles { get; set; } = new List<_role>();
    public virtual ICollection<_account> account { get; set; } = new List<_account>();

}
