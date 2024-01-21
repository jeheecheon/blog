using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OAuthController : ControllerBase {
    private readonly ILogger<OAuthController> _logger;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    private static readonly string _GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    private static readonly string _GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
    private static readonly string _GOOGLE_CB_URL = "/api/oauth/cb-google";
    public OAuthController(
        ILogger<OAuthController> logger,
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration
    ) {
        _logger = logger;
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    [HttpGet("sign-in")]
    public IActionResult SignIn(string provider) {
        using var httpClient = _httpClientFactory.CreateClient();
        switch (provider) {
            case "google":
                string redirectUrl = _GOOGLE_AUTH_URL +
                    $"?client_id={_configuration["OAuth:Google:ClientId"]}" +
                    $"&redirect_uri={_configuration["ServerUrl"]}{_GOOGLE_CB_URL}" +
                    $"&response_type=code" +
                    $"&scope=email";
                return Redirect(url: redirectUrl);
            default:
                return BadRequest();
        }
    }

    [HttpGet("cb-google")]
    public async Task<IActionResult> GoogleCallbackAsync([FromQuery] string code, [FromQuery] string scope) {
        // Construct a redirect url to send to google to get tokens 
        var redirectUrl = _GOOGLE_TOKEN_URL +
            $"?client_id={_configuration["OAuth:Google:ClientId"]}" +
            $"&client_secret={_configuration["OAuth:Google:ClientSecret"]}" +
            $"&code={code}" +
            $"&grant_type=authorization_code" +
            $"&redirect_uri={_configuration["ServerUrl"]}{_GOOGLE_CB_URL}";
        
        // Variable for a http response message from Google
        HttpResponseMessage httpResponseMessage = default!;
        
        // Initialize a http client object
        using (var httpClient = _httpClientFactory.CreateClient()) {
            // Send a http request to get toknes for the current user
            try {
                httpResponseMessage = (await httpClient.PostAsync(redirectUrl, null))
                    .EnsureSuccessStatusCode();
            }
            catch (Exception e) {
                _logger.LogInformation(e.Message);
                return Redirect(_configuration["ClientUrls:jeheecheon"]!);
            }
            
            // Retract User Tokens from the body of response
            var tokensResponse = await httpResponseMessage.Content.ReadFromJsonAsync<GoogleTokensResponseDto>();
            
            // Make sure the fecthing was successful
            if (tokensResponse is null) {
                _logger.LogInformation("Failed to fetch the user info.");
                return Redirect(_configuration["ClientUrls:jeheecheon"]!);
            }
            
            // Create a http request with a auth token in it
            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, "https://www.googleapis.com/oauth2/v2/userinfo") {
                Headers = {
                    { "Authorization", $"Bearer {tokensResponse.access_token}" }
                }
            };
            
            // Send a http request to get user info of the current user
            try {
                httpResponseMessage = (await httpClient.SendAsync(httpRequestMessage))
                    .EnsureSuccessStatusCode();
            }
            catch (Exception e) {
                _logger.LogInformation(e.Message);
                return Redirect(_configuration["ClientUrls:jeheecheon"]!);
            }
        }

        // Extract a user info from the body of the response from google
        var userInfoResponse = await httpResponseMessage.Content.ReadFromJsonAsync<GoogleUserInfoResponse>();
        
        // Check if the user info is correct and has a verified email 
        if (userInfoResponse == null || !userInfoResponse.verified_email)
            _logger.LogInformation("User Info that's just fetched is null or the email is not verified.");
        else {
            var claims = new List<Claim> {
                new Claim(ClaimTypes.Email, userInfoResponse.email),
            };
            
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme, 
                new ClaimsPrincipal(claimsIdentity));
            
            _logger.LogInformation("User {Email} logged in at {Time}.", 
                userInfoResponse.email, DateTime.UtcNow);
        }
        
        return Redirect($"{_configuration["ClientUrls:jeheecheon"]!}/blog/posts");
    }
}
