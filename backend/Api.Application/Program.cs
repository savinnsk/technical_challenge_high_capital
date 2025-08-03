using Api.Aplication.Configs;
using Api.CrossCutting.DependencyInjection;
using application.Configs;



var builder = WebApplication.CreateBuilder(args);
var config = new Configs(builder.Services, builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

new Swagger(builder.Services, builder.Configuration).Configure();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
DotNetEnv.Env.Load();

InjectAllDependencies.Configure(builder.Services, config.AuthToken());

var app = new App(builder);


app.Startup().Run();
