namespace application.Configs
{
    public class App
    {
        public WebApplicationBuilder builder;
        public App(WebApplicationBuilder webApplicationBuilder)
        {
            builder = webApplicationBuilder;
        }

        public WebApplication Startup()
        {

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();
            app.UseCors("AllowFrontend");
            app.MapControllers();

            return app;

        }
    }
}






