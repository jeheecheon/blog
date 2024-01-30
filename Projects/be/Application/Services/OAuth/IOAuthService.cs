using Core.DTOs;

namespace Application.Services.OAuth;

public interface IOAuthService
{
    public string MakeRedirectUrl(string provider);
    public Task<GoogleUserInfoResponseDto?> AuthenticateUserAsync(string code, string scope);
    public Task RegisterUserAsync(string provider, GoogleUserInfoResponseDto userInfo);
    public Task GenerateCookieAsync(GoogleUserInfoResponseDto userInfo);
}
