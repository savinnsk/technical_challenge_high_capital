using Api.Data.Repository;
using Api.Domain.Interfaces.Repositories;
using Api.Domain.Interfaces.Services;
using Api.Service.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Api.CrossCutting.DependencyInjection
{
    public class ModelsDependencies
    {
        public static void Inject(IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<IUserRepository, UserRepository>();
            serviceCollection.AddTransient<IUserService, UserService>();
            serviceCollection.AddTransient<IChatbotRepository, ChatbotRepository>();
            serviceCollection.AddTransient<IChatbotService, ChatbotService>();
            serviceCollection.AddTransient<IMessageRepository, MessageRepository>();
            serviceCollection.AddTransient<IMessageService, MessageService>();
        }
    }
}
