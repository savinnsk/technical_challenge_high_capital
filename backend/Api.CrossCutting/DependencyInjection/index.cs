using Api.Data.Repository;
using Api.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Api.CrossCutting.DependencyInjection
{
    public class InjectAllDependencies
    {
        public static void Configure(IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
            DataBaseDependencies.Inject(serviceCollection);
            UsersDependencies.Inject(serviceCollection);
            AutoMapperDependencies.Inject(serviceCollection);
        }
    }
}
