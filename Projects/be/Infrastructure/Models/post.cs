using System;
using System.Collections.Generic;

namespace Infrastructur.Models;

public partial class post
{
    public Guid id { get; set; }

    public string title { get; set; } = null!;

    public string content { get; set; } = null!;

    public DateTime uploaded_at { get; set; }

    public DateTime? edited_at { get; set; }

    public int category_id { get; set; }

    public string? cover { get; set; }

    public virtual category category { get; set; } = null!;

    public virtual ICollection<comment> comments { get; set; } = new List<comment>();

    public virtual ICollection<liked_post> liked_posts { get; set; } = new List<liked_post>();

    public virtual ICollection<hashtag> hashtags { get; set; } = new List<hashtag>();
}
