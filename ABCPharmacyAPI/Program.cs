using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using ABCPharmacyAPI.Repositories;
using ABCPharmacyAPI.Services;
using ABCPharmacyAPI.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "https://localhost:3000"
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

// Configure DI: repository requires a file path and logger; read from config
var dataFile = builder.Configuration["Data:MedicineFilePath"] ?? "Data/medicines.json";
builder.Services.AddSingleton<IMedicineRepository>(sp =>
{
    var logger = sp.GetRequiredService<ILogger<MedicineRepository>>();
    return new MedicineRepository(dataFile, logger);
});

builder.Services.AddScoped<IMedicineService, MedicineService>();

var app = builder.Build();

app.UseGlobalExceptionHandling();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
