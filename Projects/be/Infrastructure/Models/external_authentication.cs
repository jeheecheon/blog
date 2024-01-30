using System;
using System.Collections.Generic;

namespace Infrastructur.Models;

public partial class external_authentication
{
    public int provider_id { get; set; }

    public string account_id_from_provider { get; set; } = null!;

    public Guid account_id { get; set; }

    public virtual account account { get; set; } = null!;

    public virtual external_login_provider provider { get; set; } = null!;
}
