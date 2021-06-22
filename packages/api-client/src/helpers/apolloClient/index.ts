import { Config } from '../../types';
import { Logger } from '@vue-storefront/core';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import fetch from 'isomorphic-fetch';

const createErrorHandler = () => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        if (!message.includes('Resource Owner Password Credentials Grant')) {
          if (!locations) {
            Logger.error(`[GraphQL error]: Message: ${message}, Path: ${path}`);
            return;
          }

          const parsedLocations = locations.map(({ column, line }) => `[column: ${column}, line: ${line}]`);

          Logger.error(`[GraphQL error]: Message: ${message}, Location: ${parsedLocations.join(', ')}, Path: ${path}`);
        }
      });
    }

    if (networkError) {
      Logger.error(`[Network error]: ${networkError.message}`);
    }
  });
};

const createLink = (settings: Config): any => {
  console.log('createLink', settings.api.uri);
  const httpLink = createHttpLink({ uri: settings.api.uri, fetch });
  const onErrorLink = createErrorHandler();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const authLink = setContext(async (apolloReq, { headers }) => {
    Logger.debug('Apollo authLink', apolloReq.operationName);

    const token = settings.getAccessToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : ''
      }
    };
  });

  // const errorRetry = new RetryLink({
  //     attempts: handleRetry({ tokenProvider }),
  //     delay: () => 0
  //   });

  const apolloLink = ApolloLink.from([onErrorLink, httpLink]);

  return {
    apolloLink
  };
};

export {
  createErrorHandler,
  createLink
};
