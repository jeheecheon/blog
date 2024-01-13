var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

// The call to AddEndpointsApiExplorer shown in the preceding example is required only for minimal APIs.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register IHttpClientFactory
builder.Services.AddHttpClient();

// Enable api controller
builder.Services.AddControllers();

// CORS
builder.Services.AddCors(corsOpts => {
    corsOpts.AddDefaultPolicy(b => {
        b.WithOrigins(builder.Configuration["ClientUrls:jeheecheon"]!)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

app.UseHttpsRedirection();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.MapControllers();

app.Run();
