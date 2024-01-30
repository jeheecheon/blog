using System;
using System.Collections.Generic;

namespace Infrastructur.Models;

public partial class liked_post
{
    public Guid post_id { get; set; }

    public Guid account_id { get; set; }

    public DateTime created_at { get; set; }

    public virtual account account { get; set; } = null!;

    public virtual post post { get; set; } = null!;
}
