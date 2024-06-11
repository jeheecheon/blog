namespace Application.Services.Account;

public interface IAccountService
{
    public bool FilterAdmin();
    public Task<bool> Authenticate();
}
