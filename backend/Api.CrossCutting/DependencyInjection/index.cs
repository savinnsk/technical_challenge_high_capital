using Api.Data.Repository;
using Api.Domain.Interfaces;
using Api.Domain.Security;
using Microsoft.Extensions.DependencyInjection;


namespace Api.CrossCutting.DependencyInjection
{
    public class InjectAllDependencies
    {
        public static void Configure(IServiceCollection serviceCollection, TokenConfiguration? tokenConfiguration)
        {
            serviceCollection.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
            DataBaseDependencies.Inject(serviceCollection);
            UsersDependencies.Inject(serviceCollection);
            AuthorizationDependencies.Inject(serviceCollection,tokenConfiguration);
            AutoMapperDependencies.Inject(serviceCollection);
        }
        
    }
}