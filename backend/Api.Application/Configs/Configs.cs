

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

    }


}


