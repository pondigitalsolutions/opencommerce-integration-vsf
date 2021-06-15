import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-fetch';

import { apiClientFactory } from '@vue-storefront/core';
import { Config } from './types';
import * as getCategory from './api/getCategory';

const defaultSettings = {};

const onCreate = (settings) => {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = settings.getAccessToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : ''
      }
    };
  });

  console.log('config', settings);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(
      createHttpLink({ uri: settings.api.uri, fetch })
    )
  });

  return ({
    config: {
      ...defaultSettings,
      ...settings
    },
    client
  });
};

const { createApiClient } = apiClientFactory<Config, any>({
  onCreate,
  api: {
    getCategory
  }
});

export {
  createApiClient
};
