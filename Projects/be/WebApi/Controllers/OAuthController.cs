using Application.Services.OAuth;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OAuthController : ControllerBase
{
    private readonly ILogger<OAuthController> _logger;
    private readonly IConfiguration _configuration;
    private readonly IOAuthService _oauthService;

    public OAuthController(
        ILogger<OAuthController> logger,
        IConfiguration configuration,
        IOAuthService oauthService
    )
    {
        _logger = logger;
        _configuration = configuration;
        _oauthService = oauthService;
    }

    [HttpGet("sign-in")]
    public IActionResult SignIn(string provider)
    {
        string redirectUrl = _oauthService.MakeRedirectUrl(provider);

        if (string.IsNullOrWhiteSpace(redirectUrl))
            return BadRequest();
        else
            return Redirect(url: redirectUrl);
    }

    [HttpGet("cb-google")]
    public async Task<IActionResult> GoogleCallbackAsync([FromQuery] string code, [FromQuery] string scope, [FromQuery] string state)
    {
        var userInfo = await _oauthService.AuthenticateUserAsync(code, scope);
        if (userInfo is not null)
        {
            Guid? user_id = await _oauthService.RegisterUserAsync("google", userInfo);
            if (user_id is not null)
                await _oauthService.GenerateCookieAsync(user_id.Value, userInfo.email, userInfo.picture);
        }
        
        // string prevUrl = System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(state));
        // if (string.IsNullOrWhiteSpace(prevUrl) == false
        //     && prevUrl.StartsWith(_configuration["ClientUrls:root"]!))
        //     return Redirect(prevUrl);
        // else
            return Redirect(_configuration["ClientUrls:root"]!);
    }
}
