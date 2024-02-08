﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructur.Models;

[Table("account")]
public partial class _account
{
    public Guid id { get; set; }

    public string email { get; set; } = null!;

    public string normalized_email { get; set; } = null!;

    public bool is_email_confirmed { get; set; }

    public string? avatar { get; set; }

    public DateTime created_at { get; set; }

    public virtual ICollection<_comment> comments { get; set; } = new List<_comment>();

    public virtual ICollection<external_authentication> external_authentications { get; set; } = new List<external_authentication>();

    public virtual ICollection<liked_comment> liked_comments { get; set; } = new List<liked_comment>();

    public virtual ICollection<liked_post> liked_posts { get; set; } = new List<liked_post>();

    public virtual ICollection<account_role> account_roles { get; set; } = new List<account_role>();
}