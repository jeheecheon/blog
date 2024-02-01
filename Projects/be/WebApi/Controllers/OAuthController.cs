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
    public async Task<IActionResult> GoogleCallbackAsync([FromQuery] string code, [FromQuery] string scope)
    {
        var userInfo = await _oauthService.AuthenticateUserAsync(code, scope);
        if (userInfo is not null)
        {
            Guid? user_id = await _oauthService.RegisterUserAsync("google", userInfo);
            if (user_id is not null)
                await _oauthService.GenerateCookieAsync(user_id.Value, userInfo.email, userInfo.picture);
        }
        return Redirect(_configuration["ClientUrls:blog"]!);
    }
}
