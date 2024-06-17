namespace Application.Services.Account;

public interface IAccountService
{
    public bool FilterAdmin();
    public Task<bool> Authenticate();
    public string GenerateJWTToken(Guid user_id, string email, string? avatar);
}
