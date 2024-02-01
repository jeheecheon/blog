using System.Net.Http.Json;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Core.DTOs;
using Infrastructur.Repositories.Account;
using Infrastructur.Models;

namespace Application.Services.OAuth;

public class OAuthService : IOAuthService
{
    private static readonly string _GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    private static readonly string _GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
    private static readonly string _GOOGLE_CB_URL = "/api/oauth/cb-google";

    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IAccountRepository _accountRepository;

    ILogger<OAuthService> _logger;
    public OAuthService(
        ILogger<OAuthService> logger,
        IConfiguration configuration,
        IHttpClientFactory httpClientFactory,
        IHttpContextAccessor httpContextAccessor,
        IAccountRepository accountRepository
    )
    {
        _logger = logger;
        _configuration = configuration;
        _httpClientFactory = httpClientFactory;
        _httpContextAccessor = httpContextAccessor;
        _accountRepository = accountRepository;
    }

    public string MakeRedirectUrl(string provider)
    {
        switch (provider)
        {
            case "google":
                return _GOOGLE_AUTH_URL +
                    $"?client_id={_configuration["OAuth:Google:ClientId"]}" +
                    $"&redirect_uri={_configuration["ServerUrl"]}{_GOOGLE_CB_URL}" +
                    $"&response_type=code" +
                    $"&scope=email";
            default:
                return string.Empty;
        }
    }

    public async Task<GoogleUserInfoResponseDto?> AuthenticateUserAsync(string code, string scope)
    {
        // Construct a redirect url to send to google to get tokens 
        var redirectUrl = _GOOGLE_TOKEN_URL +
            $"?client_id={_configuration["OAuth:Google:ClientId"]}" +
            $"&client_secret={_configuration["OAuth:Google:ClientSecret"]}" +
            $"&code={code}" +
            $"&grant_type=authorization_code" +
            $"&redirect_uri={_configuration["ServerUrl"]}{_GOOGLE_CB_URL}";

        // Store http response from Google
        HttpResponseMessage httpResponseMessage = default!;

        using (var httpClient = _httpClientFactory.CreateClient())
        {
            // Send a http request to get toknes for the current user
            try
            {
                httpResponseMessage = (await httpClient.PostAsync(redirectUrl, null))
                    .EnsureSuccessStatusCode();
            }
            catch (Exception e)
            {
                _logger.LogInformation(e.Message);
                return null;
            }

            // Retract User Tokens from the body of response
            var tokensResponse = await httpResponseMessage.Content.ReadFromJsonAsync<GoogleTokensResponseDto>();

            // Check if the fecthing was successful
            if (tokensResponse is null)
            {
                _logger.LogInformation("Failed to fetch the user info.");
                return null;
            }

            // Create a http request with a auth token in it
            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, "https://www.googleapis.com/oauth2/v2/userinfo")
            {
                Headers = {
                    { "Authorization", $"Bearer {tokensResponse.access_token}" }
                }
            };

            // Send a http request to get user info of the current user
            try
            {
                httpResponseMessage = (await httpClient.SendAsync(httpRequestMessage))
                    .EnsureSuccessStatusCode();
            }
            catch (Exception e)
            {
                _logger.LogInformation(e.Message);
                return null;
            }
        }

        // Extract a user info from the body of the response from google
        var userInfoResponse = await httpResponseMessage.Content.ReadFromJsonAsync<GoogleUserInfoResponseDto>();

        // Check if the user info is correct and has a verified email 
        if (userInfoResponse == null || string.IsNullOrWhiteSpace(userInfoResponse.email) || !userInfoResponse.verified_email)
        {
            _logger.LogInformation("User Info just fetched is null or the email is not verified.");
            return null;
        }
        else
        {
            userInfoResponse.email = userInfoResponse.email.Normalize();
            return userInfoResponse;
        }
    }

    public async Task RegisterUserAsync(string provider, GoogleUserInfoResponseDto userInfo)
    {
        // Create a user account
        await _accountRepository.AddAccountAsync(userInfo);

        // Fetch the user uuid
        account? account = _accountRepository.GetAccountByNormalizedEmail(userInfo.email.ToUpper());
        if (account is null || string.IsNullOrWhiteSpace(account.normalized_email)) 
            return;

        // Fetch provider's id
        var providerInfo = _accountRepository.GetExternalLoginProviderByName(provider);
        if (providerInfo is null)
            return;

        // Register the current user with the provider
        await _accountRepository.AddExternalAuthenticationAsync(
            providerInfo.id, userInfo.id, account.id);
    }

    public async Task GenerateCookieAsync(GoogleUserInfoResponseDto userInfo)
    {
        var claims = new List<Claim> {
                new Claim(ClaimTypes.Email, userInfo.email),
                new Claim("avatar", userInfo.picture)
            };

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        await _httpContextAccessor.HttpContext.Response.HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity));

        _logger.LogInformation("User {Email} logged in at {Time}.",
            userInfo.email, DateTime.UtcNow);
    }
}