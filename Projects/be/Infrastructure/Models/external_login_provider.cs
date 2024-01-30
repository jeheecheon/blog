using System;
using System.Collections.Generic;

namespace Infrastructur.Models;

public partial class external_login_provider
{
    public int id { get; set; }

    public string name { get; set; } = null!;

    public virtual ICollection<external_authentication> external_authentications { get; set; } = new List<external_authentication>();
}
