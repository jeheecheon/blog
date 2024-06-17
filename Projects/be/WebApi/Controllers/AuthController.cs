using Application.Services.Account;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly IAccountService _accountService;

    public AuthController(
        ILogger<AuthController> logger,
        IAccountService accountService
    )
    {
        _logger = logger;
        _accountService = accountService;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Authenticate()
    {
        return Ok(JsonSerializer.Serialize(new
        {
            email = HttpContext.User.Claims.FirstOrDefault((c) => c.Type == ClaimTypes.Email)?.Value,
            name = HttpContext.User.Claims.FirstOrDefault((c) => c.Type == ClaimTypes.Email)?.Value,
            avatar = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "avatar")?.Value
        }));
    }

    [HttpGet("admin")]
    [Authorize]
    public IActionResult AuthenticateAdmin()
    {
        return _accountService.FilterAdmin() ? Ok() : Forbid();
    }
}
