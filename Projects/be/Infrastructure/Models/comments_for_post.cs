using System;
using System.Collections.Generic;

namespace Infrastructur.Models;

public partial class comments_for_post
{
    public Guid? id { get; set; }

    public string? content { get; set; }

    public DateTime? uploaded_at { get; set; }

    public Guid? parent_comment_id { get; set; }

    public Guid? post_id { get; set; }

    public bool? is_deleted { get; set; }

    public string? email { get; set; }
}
