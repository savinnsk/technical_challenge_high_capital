using Api.Aplication.Configs;
using Api.CrossCutting.DependencyInjection;
using Api.Data.Context;
using application.Configs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;


DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);
var config = new Configs(builder.Services, builder.Configuration);

var API_URL_HOST = Environment.GetEnvironmentVariable("API_HOST") ?? "http://0.0.0.0:5201";
var FRONTEND_URL_HOST = Environment.GetEnvironmentVariable("FRONTEND_URL") ?? "http://localhost:5173";

builder.WebHost.UseUrls(API_URL_HOST);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder.WithOrigins(FRONTEND_URL_HOST)
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});


new Swagger(builder.Services, builder.Configuration).Configure();


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<MyContext>(options =>
      options.UseSqlite(Environment.GetEnvironmentVariable("DATABASESQLITE") ?? "Data Source=/app/Api.Data/mydatabase.db"));


InjectAllDependencies.Configure(builder.Services, config.AuthToken());


var frontendPath = Path.Combine(AppContext.BaseDirectory, "frontend");

var app = builder.Build();

app.UseCors("AllowFrontend");

var frontendFileProvider = new PhysicalFileProvider(frontendPath);

app.UseDefaultFiles(new DefaultFilesOptions
{
	FileProvider = frontendFileProvider,
	RequestPath = ""
});

app.UseStaticFiles(new StaticFileOptions
{
	FileProvider = frontendFileProvider,
	RequestPath = ""
});

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html", new StaticFileOptions
{
	FileProvider = frontendFileProvider
});



app.Run();
//app.Startup().Run();
