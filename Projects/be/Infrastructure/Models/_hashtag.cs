using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Infrastructur.Models;

[Table("hashtag")]
public partial class _hashtag
{
    public int id { get; set; }

    public string name { get; set; } = null!;

    public virtual ICollection<_post> posts { get; set; } = new List<_post>();
}
