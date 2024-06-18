using System.Text.Json;
using Application.Services.Account;
using Application.Services.OAuth;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OAuthController : ControllerBase
{
    private readonly ILogger<OAuthController> _logger;
    private readonly IConfiguration _configuration;
    private readonly IAccountService _accountService;
    private readonly IOAuthService _oauthService;

    public OAuthController(
        ILogger<OAuthController> logger,
        IConfiguration configuration,
        IOAuthService oauthService,
        IAccountService accountService
    )
    {
        _logger = logger;
        _configuration = configuration;
        _oauthService = oauthService;
        _accountService = accountService;
    }

    [HttpPost("google/sign-in")]
    public async Task<IActionResult> GoogleCallbackAsync([FromQuery] string code, [FromQuery] string scope)
    {
        var userInfo = await _oauthService.GoogleAuthenticateUserAsync(code, scope);

        if (userInfo is not null)
        {
            Guid? user_id = await _oauthService.RegisterUserAsync("google", userInfo);
            if (user_id is not null)
            {
                var jwt = _accountService.GenerateJWTToken(user_id.Value, userInfo.email, userInfo.picture);

                return Ok(JsonSerializer.Serialize(jwt));
            }
        }

        return BadRequest();
    }
}
