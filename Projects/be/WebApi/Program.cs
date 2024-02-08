using Application.Services.Account;
using Application.Services.Blog;
using Application.Services.OAuth;
using Infrastructur.Repositories.Account;
using Infrastructure.DbContexts;
using Infrastructure.Repositories.Blog;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// The call to AddEndpointsApiExplorer shown in the preceding example is required only for minimal APIs.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS Settings
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("JeheecheonCorsPolicy", builder =>
//     {
//         builder.WithOrigins("http://yourfrontend.com")
//             .AllowAnyMethod()
//             .AllowAnyHeader();
//     });
// });

// Add DB contexts
builder.Services.AddDbContext<MainContext>();

// Register IHttpClientFactory
builder.Services.AddHttpClient();

// Register HttpContextAccessor
builder.Services.AddHttpContextAccessor();

// Enable api controllers
builder.Services.AddControllers();

// Register Auth services
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "AuthToken";
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.Cookie.HttpOnly = true;
        options.SlidingExpiration = true;
        options.ExpireTimeSpan = TimeSpan.FromDays(1);
        options.Cookie.MaxAge = TimeSpan.FromDays(1);
    });

// Register Authorization policy services
builder.Services.AddAuthorization();

// Register repositories
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IBlogRepository, BlogRepository>();

// Register services
builder.Services.AddScoped<IOAuthService, OAuthService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IBlogService, BlogService>();

var app = builder.Build();

// // Commented out https setup for now
app.UseHttpsRedirection();
// app.UseCors("JeheecheonCorsPolicy");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    await InitialDataManager.SeedAsync(app.Services);
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
