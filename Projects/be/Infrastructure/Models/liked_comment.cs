using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Infrastructur.Models;

[PrimaryKey(nameof(comment_id), nameof(account_id))]
public partial class liked_comment
{
    public Guid comment_id { get; set; }

    public Guid account_id { get; set; }

    public DateTime created_at { get; set; }

    public virtual _account account { get; set; } = null!;

    public virtual _comment comment { get; set; } = null!;
}
