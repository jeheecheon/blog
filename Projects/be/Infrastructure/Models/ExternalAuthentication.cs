using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Infrastructur.Models;

[PrimaryKey(nameof(ProviderId), nameof(AccountIdFromProvider))]
[Table("external_authentication")]
public partial class ExternalAuthentication
{
    [Column("provider_id")]
    [ForeignKey(nameof(Provider))]
    public int ProviderId { get; set; }

    [Column("account_id_from_provider")]
    public string AccountIdFromProvider { get; set; } = null!;

    [Column("account_id")]
    [ForeignKey(nameof(Account))]
    public Guid AccountId { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual ExternalLoginProvider Provider { get; set; } = null!;
}
