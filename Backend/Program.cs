using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using TechnicalSkill.Extensions;
using TechnicalSkill.Models;
using TechnicalSkill.Repositories;
using TechnicalSkill.Repositories.Interfaces;
using TechnicalSkill.Services;
using TechnicalSkill.Services.Interfaces;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// Add configuration from environment variables and .env file
builder.Configuration
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables();

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add AutoMapper
builder.Services.AddAutoMapperConfiguration();

// Configure DbContext
Env.Load();
var dbUser = Environment.GetEnvironmentVariable("MSSQL_SA_USERNAME");
var dbPass = Environment.GetEnvironmentVariable("MSSQL_SA_PASSWORD");

if (string.IsNullOrWhiteSpace(dbUser) || string.IsNullOrWhiteSpace(dbPass))
{
    throw new InvalidOperationException("Missing MSSQL credentials in environment variables.");
}

var connectionString = $"Server=localhost,1433;Database=TechnicalSkill;User Id={dbUser};Password={dbPass};Encrypt=True;TrustServerCertificate=True";
builder.Services.AddDbContext<TechnicalSkillContext>(options =>
    options.UseSqlServer(connectionString));

// Add repositories and services
builder.Services.AddScoped<IAssignmentRepository, AssignmentRepository>();
builder.Services.AddScoped<IAssignmentService, AssignmentService>();

// Configure CORS
builder.Services.AddCors(options =>
    options.AddPolicy("AllowReactApp",
        builder => builder.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()));

// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
    });

// Configure OpenAPI
builder.Services.AddOpenApi();

var app = builder.Build();

// Custom exception handling middleware
app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        // Log the exception
        var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An unhandled exception has occurred.");

        // Return 500 with error details
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";
        
        var errorResponse = new
        {
            StatusCode = StatusCodes.Status500InternalServerError,
            Message = "An unexpected error occurred. Please try again later.",
            Details = app.Environment.IsDevelopment() ? ex.ToString() : null
        };

        await context.Response.WriteAsJsonAsync(errorResponse);
    }
});

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.MapControllers();

app.Run();

