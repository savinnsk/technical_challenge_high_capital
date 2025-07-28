
using Api.Domain.Security;

namespace Api.Aplication.Configs
{
    public class Configs
    {

        private IServiceCollection _serviceCollection;
        private ConfigurationManager _configurationManager;
        public Configs(IServiceCollection serviceCollection, ConfigurationManager configurationManager)
        {
            _serviceCollection = serviceCollection;
            _configurationManager = configurationManager;
        }

        public TokenConfiguration? AuthToken()
        {
            var tokenConfiguration = _configurationManager.GetSection("TokenConfigurations").Get<TokenConfiguration>();
            _serviceCollection.Configure<TokenConfiguration>(_configurationManager.GetSection("TokenConfigurations"));
            _serviceCollection.AddSingleton(tokenConfiguration);

            return tokenConfiguration;
        }
    }


}


