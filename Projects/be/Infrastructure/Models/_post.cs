using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructur.Models;

[Table("post")]
public partial class _post
{
    public Guid id { get; set; }

    public string title { get; set; } = null!;

    public string content { get; set; } = null!;

    public DateTime uploaded_at { get; set; }

    public DateTime? edited_at { get; set; }

    public string? cover { get; set; }

    public string? category_id { get; set; }

    public virtual _category? category { get; set; }

    public virtual ICollection<_comment> comments { get; set; } = new List<_comment>();

    public virtual ICollection<liked_post> liked_posts { get; set; } = new List<liked_post>();

    public virtual ICollection<_hashtag> hashtags { get; set; } = new List<_hashtag>();
}
