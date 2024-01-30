using System;
using System.Collections.Generic;

namespace Infrastructur.Models;

public partial class liked_comment
{
    public Guid comment_id { get; set; }

    public Guid account_id { get; set; }

    public DateTime created_at { get; set; }

    public virtual account account { get; set; } = null!;

    public virtual comment comment { get; set; } = null!;
}
