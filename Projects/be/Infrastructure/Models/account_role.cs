using System;
using System.Collections.Generic;

namespace Infrastructur.Models;

public partial class account_role
{
    public Guid account_id { get; set; }

    public int role_id { get; set; }
}
