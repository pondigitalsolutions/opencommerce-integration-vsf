import { CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import allCategoriesQuery from './allCategoriesQuery';

const getCategory = async (context, params, customQuery?: CustomQuery) => {
  const { categories } = context.extendQuery(customQuery,
    { categories: { query: allCategoriesQuery, variables: params } }
  );

  const request = await (context.client as ApolloClient<any>).query<any[]>({
    query: gql`${categories.query}`,
    variables: categories.variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default getCategory;
