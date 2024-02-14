using Core.DTOs;
using Infrastructur.Models;

namespace Infrastructur.Repositories.Account;

public interface IAccountRepository
{
    public Task AddAccountAsync(GoogleUserInfoResponseDto userInfo);
    public Task AddExternalAuthenticationAsync(int provider_id, string account_id_from_provider, Guid account_id);
    public ExternalLoginProvider? GetExternalLoginProviderByName(string provider);
    public Infrastructur.Models.Account? GetAccountByNormalizedEmail(string email);
    public Role? GetAdminRole();
    public AccountRole? GetAccountRole(int role_id, Guid account_id);
    public Task<bool> UpdateAvatarAsync(Guid account_id, string avatar);
}