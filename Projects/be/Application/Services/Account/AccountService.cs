using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Infrastructur.Models;
using Infrastructur.Repositories.Account;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services.Account;

public class AccountService : IAccountService
{
    private readonly ILogger<AccountService> _logger;
    private readonly IAccountRepository _accountRepository;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IConfiguration _configuration;

    public AccountService(
        ILogger<AccountService> logger,
        IAccountRepository accountRepository,
        IHttpContextAccessor httpContextAccessor,
        IConfiguration configuration
    )
    {
        _logger = logger;
        _accountRepository = accountRepository;
        _httpContextAccessor = httpContextAccessor;
        _configuration = configuration;
    }

    public bool FilterAdmin()
    {
        string? guidString = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Sid)?.Value;
        if (string.IsNullOrWhiteSpace(guidString))
            return false;
        Guid account_id = Guid.Parse(guidString);

        Role? admin = _accountRepository.GetAdminRole();
        if (admin is null)
            return false;

        AccountRole? admin_account = _accountRepository.GetAccountRole(admin.Id, account_id);
        return admin_account is null ? false : true;
    }

    public async Task<bool> Authenticate()
    {
        var result = await _httpContextAccessor.HttpContext!.AuthenticateAsync();
        return result.Succeeded;
    }

    public string GenerateJWTToken(Guid user_id, string email, string? avatar)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Sid, user_id.ToString()),
            new Claim(ClaimTypes.Email, email),
        };
        if (avatar is not null
        && !string.IsNullOrWhiteSpace(avatar))
            claims.Add(new Claim("avatar", avatar));

        var jwtToken = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddDays(2),
            signingCredentials: new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]!)),
                SecurityAlgorithms.HmacSha256Signature
            )
        );

        return new JwtSecurityTokenHandler().WriteToken(jwtToken);
    }
}
