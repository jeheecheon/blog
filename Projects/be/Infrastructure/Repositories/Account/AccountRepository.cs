using Core.DTOs;
using Infrastructur.Models;
using Infrastructure.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructur.Repositories.Account;

public class AccountRepository : IAccountRepository
{
    private readonly ILogger<AccountRepository> _logger;
    private readonly MainContext _mainContext;
    public AccountRepository(
        ILogger<AccountRepository> logger,
        MainContext mainContext
    )
    {
        _logger = logger;
        _mainContext = mainContext;
    }

    public async Task AddAccountAsync(GoogleUserInfoResponseDto userInfo)
    {
        try
        {
            await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
INSERT INTO account (email, normalized_email, is_email_confirmed, avatar) VALUES 
({userInfo.email}, {userInfo.email.ToUpper()}, {userInfo.verified_email}, {userInfo.picture})
            ");
        }
        catch (Exception e)
        {
            _logger.LogInformation($"{e.Source}: {e.Message}");
        }
    }

    public async Task AddExternalAuthenticationAsync(int provider_id, string account_id_from_provider, Guid account_id)
    {
        try
        {
            await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
INSERT INTO external_authentication (provider_id, account_id_from_provider, account_id) VALUES
({provider_id}, {account_id_from_provider}, {account_id})
            ");
        }
        catch (Exception e)
        {
            _logger.LogInformation($"{e.Source}: {e.Message}");
        }
    }

    public ExternalLoginProvider? GetExternalLoginProviderByName(string provider)
    {
        try
        {
            return _mainContext.ExternalLoginProvider.FromSqlInterpolated(@$"
SELECT * FROM external_login_provider WHERE name = {provider}
            ")
                .AsEnumerable()
                .FirstOrDefault();
        }
        catch (Exception e)
        {
            _logger.LogInformation($"{e.Source}: {e.Message}");
            return null;
        }
    }

    public Infrastructur.Models.Account? GetAccountByNormalizedEmail(string email)
    {
        try
        {
            return _mainContext.Account.FromSqlInterpolated(@$"
SELECT * FROM account WHERE normalized_email = {email}
        ")
            .AsEnumerable()
            .FirstOrDefault();
        }
        catch (Exception e)
        {
            _logger.LogInformation($"{e.Source}: {e.Message}");
            return null;
        }
    }

    public Role? GetAdminRole()
    {
        try
        {
            return _mainContext.Role.FromSql(@$"
SELECT * FROM role WHERE name = 'admin';
        ")
            .AsEnumerable()
            .FirstOrDefault();
        }
        catch (Exception e)
        {
            _logger.LogInformation($"{e.Source}: {e.Message}");
            return null;
        }
    }

    public AccountRole? GetAccountRole(int role_id, Guid account_id)
    {
        try
        {
            return _mainContext.AccountRole.FromSqlInterpolated(@$"
SELECT * FROM account_role WHERE account_id = {account_id} AND role_id = {role_id};
        ")
            .AsEnumerable()
            .FirstOrDefault();
        }
        catch (Exception e)
        {
            _logger.LogInformation($"{e.Source}: {e.Message}");
            return null;
        }
    }

    public async Task<bool> UpdateAvatarAsync(Guid account_id, string avatar)
    {
        try
        {
            return await _mainContext.Database.ExecuteSqlInterpolatedAsync(@$"
UPDATE account SET avatar = {avatar} WHERE id = {account_id}
            ")
                > 0;
        }
        catch (Exception e)
        {
            _logger.LogInformation($"{e.Source}: {e.Message}");
            return false;
        }
    }
}