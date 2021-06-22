import { CustomQuery } from '@vue-storefront/core';
import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import primaryShopIdQuery from './primaryShopId';

const getStore = async (context, customQuery?: CustomQuery) => {
  const { shop } = context.extendQuery(customQuery,
    { shop: { query: primaryShopIdQuery } }
  );

  const request = await (context.client as ApolloClient<any>).query({
    query: gql`${shop.query}`,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default getStore;
