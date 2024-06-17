using System.Text;
using Amazon.S3;
using Application.Services.Account;
using Application.Services.Blog;
using Application.Services.OAuth;
using Infrastructur.Repositories.Account;
using Infrastructure.DbContexts;
using Infrastructure.Repositories.Blog;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// The call to AddEndpointsApiExplorer shown in the preceding example is required only for minimal APIs.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Set up cors policy
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(CorsPolicyBuilder =>
    {
        CorsPolicyBuilder.WithOrigins(builder.Configuration["ClientUrls:root"]!)
                .AllowCredentials()
                .AllowAnyMethod()
                .AllowAnyHeader();
    });
});

// Add DB contexts
builder.Services.AddDbContext<MainContext>();

// Register IHttpClientFactory
builder.Services.AddHttpClient();

// Register HttpContextAccessor
builder.Services.AddHttpContextAccessor();

// Enable api controllers
builder.Services.AddControllers();

// Register Auth services
builder.Services.AddAuthentication(cfg =>
{
    cfg.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    cfg.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    cfg.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(x =>
    {
        if (!builder.Environment.IsDevelopment())
        {
            x.RequireHttpsMetadata = true;
        }
        else
        {
            x.RequireHttpsMetadata = false;
        }
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]!)),
            ValidateIssuer = false,
            ValidateAudience = false,
            RequireExpirationTime = false,
            ValidateLifetime = true
        };
    });

// Register Authorization policy services
builder.Services.AddAuthorization();

// Register S3 Client
builder.Services.AddScoped<AmazonS3Client>(_ =>
{
    var accessKey = builder.Configuration["AWSSDK:S3:AccessKey"];
    var secretKey = builder.Configuration["AWSSDK:S3:SecretKey"];
    var credentials = new Amazon.Runtime.BasicAWSCredentials(accessKey, secretKey);
    return new AmazonS3Client(credentials, Amazon.RegionEndpoint.APNortheast2);
});

// Register repositories
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IBlogRepository, BlogRepository>();

// Register services
builder.Services.AddScoped<IOAuthService, OAuthService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IBlogService, BlogService>();

var app = builder.Build();

// using nginx as reverse-prox set up to handle https redirection
// app.UseHsts();
// app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

if (app.Environment.IsDevelopment())
    await InitialDataManager.SeedAsync(app.Services);

app.Run();
