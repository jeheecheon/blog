using Microsoft.Extensions.Logging;

namespace Application.Services.Account;

public class AccountService : IAccountService
{
    ILogger<AccountService> _logger;
    public AccountService(
        ILogger<AccountService> logger
    )
    {
        _logger = logger;
    }
}
