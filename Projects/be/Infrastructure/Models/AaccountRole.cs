using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Infrastructur.Models;

[PrimaryKey(nameof(AccountId), nameof(RoleId))]
[Table("account_role")]
public partial class AccountRole
{
    [ForeignKey(nameof(Accounts))]
    [Column("account_id")]
    public Guid AccountId { get; set; }

    [ForeignKey(nameof(Roles))]
    [Column("role_id")]
    public int RoleId { get; set; }

    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
    public virtual ICollection<Account> Accounts { get; set; } = new List<Account>();
}
