import React from 'react';
import fetcher from '../Fetcher';


export default function configurationProvider(WrappedComponent) {

    class ConfigurationProvider extends React.Component {
        render() {
          const { data, ...rest } = this.props;
          const configuration = {};

          // Structure and filter values
          data.results && data.results.forEach(conf => {
            const { _id, __v, __t, name, ...rest} = conf;
            configuration[name] = {
              ...rest
            };
          });

          return <WrappedComponent 
                  {...rest}
                  configuration={configuration} 
                  />;
        }
    };

return fetcher(ConfigurationProvider, '/api/configuration', true)

}