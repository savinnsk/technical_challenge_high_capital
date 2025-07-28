using Api.CrossCutting.Mappings;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace Api.CrossCutting.DependencyInjection
{
    public class AutoMapperDependencies
    {
        public static void Inject(IServiceCollection serviceCollection)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new DtoToModelProfile());
                cfg.AddProfile(new EntityToDtoProfile());
                cfg.AddProfile(new ModelToEntityProfile());
            });

            serviceCollection.AddSingleton(config.CreateMapper());
        }
    }
}
