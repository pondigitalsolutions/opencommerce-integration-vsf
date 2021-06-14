import {
  Context,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import { Category } from '@pondigitalsolutions/opencommerce-api/lib/types';
import { ProductsSearchParams } from '../types';

const params: UseCategoryFactoryParams<Category[], ProductsSearchParams> = {
  categorySearch: async (context: Context, params) => {
    console.log('useCategory', 'searching...');
    const { customQuery, ...searchParams } = params;

    let products;
    if (params.slugOrId) {
      products = await context.$opencommerce.api.getCategory(searchParams, customQuery);
    } else {
      products = await context.$opencommerce.api.getCategories(searchParams, customQuery);
    }

    return products.data;
  }
};

export default useCategoryFactory<Category[], ProductsSearchParams>(params);
