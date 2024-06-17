namespace Application.Services.Account;

public interface IAccountService
{
    public bool FilterAdmin();
    public string GenerateJWTToken(Guid user_id, string email, string? avatar);
}
