using System.Security.Claims;
using Infrastructur.Models;
using Infrastructur.Repositories.Account;
using Infrastructure.Repositories.Blog;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Application.Services.Account;

public class AccountService : IAccountService
{
    private readonly ILogger<AccountService> _logger;
    private readonly IAccountRepository _accountRepository;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AccountService(
        ILogger<AccountService> logger,
        IAccountRepository accountRepository,
        IHttpContextAccessor httpContextAccessor
    )
    {
        _logger = logger;
        _accountRepository = accountRepository;
        _httpContextAccessor = httpContextAccessor;
    }

    public bool FilterAdmin()
    {
        string? guidString = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid)?.Value;
        if (string.IsNullOrWhiteSpace(guidString))
            return false;
        Guid account_id = Guid.Parse(guidString);

        _role? admin = _accountRepository.GetAdminRole();
        if (admin is null)
            return false;

        account_role? admin_account = _accountRepository.GetAccountRole(admin.id, account_id);
        return admin_account is null ? false : true;
    }
}
