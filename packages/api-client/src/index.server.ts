import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createLink } from './helpers/apolloClient';
import { ApiClientExtension, apiClientFactory } from '@vue-storefront/core';
import { Config } from './types';

import getStore from './api/getStore';
import getCategory from './api/getCategory';

const defaultSettings = {
  api: {
    uri: 'http://localhost:3000/graphql'
  },
  cookies: {
    cartCookieName: 'vsf-cart'
  }
};

const onCreate = (settings: Config): { config: Config, client: ApolloClient<any> } => {

  const config = {
    ...defaultSettings,
    ...settings,
    getAccessToken: () => {
      return '';
    }
  } as any as Config;

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

  const { apolloLink } = createLink(config);

  const client = new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
    ...settings.customOptions
  });

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
