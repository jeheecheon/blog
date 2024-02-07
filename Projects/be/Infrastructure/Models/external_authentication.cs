using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Infrastructur.Models;

[PrimaryKey(nameof(provider_id), nameof(account_id_from_provider))]

public partial class external_authentication
{
    public int provider_id { get; set; }

    public string account_id_from_provider { get; set; } = null!;

    public Guid account_id { get; set; }

    public virtual account account { get; set; } = null!;

    public virtual external_login_provider provider { get; set; } = null!;
}
