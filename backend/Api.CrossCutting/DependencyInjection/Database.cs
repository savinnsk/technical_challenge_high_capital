using Api.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Api.CrossCutting.DependencyInjection
{
    public class DataBaseDependencies
    {
        public static void Inject(IServiceCollection serviceCollection)
        {
            string dbPath = @"..\Api.Data\mydatabase.db";
            serviceCollection.AddDbContext<MyContext>(options =>
                options.UseSqlite($"Data Source={dbPath}")
            );
        }
    }
}
