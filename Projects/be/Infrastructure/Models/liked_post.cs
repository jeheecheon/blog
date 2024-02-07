using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Infrastructur.Models;

[PrimaryKey(propertyName: nameof(post_id), nameof(account_id))]
public partial class liked_post
{
    public Guid post_id { get; set; }

    public Guid account_id { get; set; }

    public DateTime created_at { get; set; }

    public virtual account account { get; set; } = null!;

    public virtual post post { get; set; } = null!;
}
