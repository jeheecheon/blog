using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructur.Models;

[Table("comment")]
public partial class _comment
{
    public Guid id { get; set; }

    public Guid? parent_comment_id { get; set; }

    public Guid account_id { get; set; }

    public Guid post_id { get; set; }

    public string content { get; set; } = null!;

    public DateTime uploaded_at { get; set; }

    public bool is_deleted { get; set; }

    public virtual ICollection<_comment> Inverseparent_comment { get; set; } = new List<_comment>();

    public virtual _account account { get; set; } = null!;

    public virtual ICollection<liked_comment> liked_comments { get; set; } = new List<liked_comment>();

    public virtual _comment? parent_comment { get; set; }

    public virtual _post post { get; set; } = null!;
}
