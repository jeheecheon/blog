using Core.DTOs;
using Infrastructur.Models;

namespace Infrastructur.Repositories.Account;

public interface IAccountRepository
{
    public Task AddAccountAsync(GoogleUserInfoResponseDto userInfo);
    public Task AddExternalAuthenticationAsync(int provider_id, string account_id_from_provider, Guid account_id);
    public external_login_provider? GetExternalLoginProviderByName(string provider);
    public _account? GetAccountByNormalizedEmail(string email);
    public _role? GetAdminRole();
    public account_role? GetAccountRole(int role_id, Guid account_id);
}