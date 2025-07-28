

using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Api.Aplication.Configs
{
    public class Swagger
    {

        private IServiceCollection _serviceCollection;
        private ConfigurationManager _configurationManager;
        public Swagger(IServiceCollection serviceCollection, ConfigurationManager configurationManager)
        {
            _serviceCollection = serviceCollection;
            _configurationManager = configurationManager;
        }

        public void Configure()
        {

            _serviceCollection.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "STUDY API",
                    Description = "DDD",
                    Contact = new OpenApiContact
                    {
                        Name = "savio",
                        Email = "savio.brito.prestserv@petrobras.com.br",
                    },
                });

     
                
                options.OperationFilter<SecurityRequirementsOperationFilter>();
                   

            });


        }
    }




  



}


