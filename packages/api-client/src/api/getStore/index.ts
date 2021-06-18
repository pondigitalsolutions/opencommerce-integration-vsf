import { Logger } from '@vue-storefront/core';
import { ApolloClient } from 'apollo-client';
import primaryShopIdQuery from './primaryShopId';

const getStore = async (context) => {

  console.log('getStore', 'in ApolloClient request...');

  const request = await (context.client as ApolloClient<any>).query<any>({
    query: primaryShopIdQuery,
    variables: {},
    fetchPolicy: 'no-cache'
  });
  Logger.debug(request);
  console.log('getStore', request);

  return request;
};

export default getStore;
