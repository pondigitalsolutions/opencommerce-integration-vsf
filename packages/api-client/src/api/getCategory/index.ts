import allCategoriesQuery from '../../graphql/allCategoriesQuery';
import singleCategoryQuery from '../../graphql/singleCategoryQuery';

type CategoriesQueryVariables = {
    shopId: string;
    pageSize?: number;
    page?: number;
    [x: string]: number | string;
};

type CategoryQueryVariables = {
    shopId: string;
    slugOrId: string;
    [x: string]: number | string;
};

const getCategories = async (context, searchParams: CategoriesQueryVariables) => {
  const { shopId, pageSize, page, ...params } = searchParams;
  const defaultParams = {
    shopId,
    pageSize: pageSize || 20,
    page: page || 1,
    ...params
  };

  return await context.client.query({
    query: allCategoriesQuery,
    variables: defaultParams,
    fetchPolicy: 'no-cache'
  });
};

const getCategory = async (context, params: CategoryQueryVariables) => {
  return context.client.query({
    query: singleCategoryQuery,
    variables: params,
    fetchPolicy: 'no-cache'
  });
};

export {
  getCategory,
  getCategories
};
