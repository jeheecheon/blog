using Core.DTOs;

namespace Application.Services.OAuth;

public interface IOAuthService
{
    public Task<GoogleUserInfoResponseDto?> GoogleAuthenticateUserAsync(string code, string scope);
    public Task<Guid?> RegisterUserAsync(string provider, GoogleUserInfoResponseDto userInfo);
}
