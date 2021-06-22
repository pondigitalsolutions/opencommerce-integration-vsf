import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';
import { ApiClientExtension, apiClientFactory } from '@vue-storefront/core';
import { Config } from './types';

import getStore from './api/getStore';
import getCategory from './api/getCategory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

const defaultSettings = {
  api: {
    uri: 'http://localhost:3000/graphql'
  },
  cookies: {
    cartCookieName: 'vsf-cart'
  }
};

const onCreate = (settings): { config: Config, client: ApolloClient<any> } => {

  const config = {
    ...defaultSettings,
    ...settings,
    getAccessToken: () => {
      return null;
    }
  } as any as Config;

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = config.getAccessToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : ''
      }
    };
  });

  if (settings.client) {
    return { client: settings.client, config };
  }

  if (settings.customOptions && settings.customOptions.link) {
    return {
      client: new ApolloClient({
        cache: new InMemoryCache(),
        ...settings.customOptions
      }),
      config
    };
  }

  // const { apolloLink } = createLink(config);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(
      createHttpLink({ uri: config.api.uri, fetch })
    )
  });

  // const client = new ApolloClient({
  //   link: apolloLink,
  //   cache: new InMemoryCache(),
  //   ...settings.customOptions
  // });

  return ({
    config,
    client
  });
};

const extension: ApiClientExtension = {
  name: 'dataExtension',
  hooks: (req, res) => ({
    beforeCreate: ({ configuration }) => {
      const cartCookieName = configuration.cookies?.cartCookieName || defaultSettings.cookies.cartCookieName;

      return {
        ...configuration,
        state: {
          getCartId: () => req.cookies[cartCookieName],
          setCartId: (id) => {
            if (!id) {
              delete req.cookies[cartCookieName];
              return;
            }
            res.cookie(cartCookieName, JSON.stringify(id));
          }
        }
      };
    }
  })
};

const { createApiClient } = apiClientFactory({
  onCreate,
  api: {
    getStore,
    getCategory
  },
  extensions: [extension]
});

export {
  createApiClient
};
