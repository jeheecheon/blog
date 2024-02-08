using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Infrastructur.Models;

[Table("external_login_provider")]
[PrimaryKey(nameof(Id))]
public partial class ExternalLoginProvider
{
    [Column("Id")]
    public int Id { get; set; }

    [Column("name")]
    public string Name { get; set; } = null!;

    public virtual ICollection<ExternalAuthentication> ExternalAuthentications { get; set; } = new List<ExternalAuthentication>();
}
