using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OAuthController : ControllerBase {
    private readonly ILogger<OAuthController> _logger;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    static private readonly string _GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    static private readonly string _GOOGLE_CB_URL = "https://localhost:7130/api/oauth/cb-google";

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
    public async Task<IActionResult> SignInAsync(string provider) {
        using var httpClient = _httpClientFactory.CreateClient();
        string redirectUrl = string.Empty;

        switch (provider) {
            case "google":
                redirectUrl = _GOOGLE_AUTH_URL +
                    $"?client_id={_configuration["OAuth:Google:ClientId"]}" +
                    $"&redirect_uri={_GOOGLE_CB_URL}" +
                    $"&response_type=code" +
                    $"&scope=email";
                break;
            default:
                return BadRequest();
        }

        return Redirect(url: redirectUrl);
    }

    [HttpGet("cb-google")]
    public IActionResult GoogleCallback() {
        return Ok("Hello World");
    }
}
