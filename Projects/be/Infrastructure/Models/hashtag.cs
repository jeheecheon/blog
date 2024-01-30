using System;
using System.Collections.Generic;

namespace Infrastructur.Models;

public partial class hashtag
{
    public int id { get; set; }

    public string name { get; set; } = null!;

    public virtual ICollection<post> posts { get; set; } = new List<post>();
}
