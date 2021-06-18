import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';
import useStore from '../useStore';

const factoryParams = {
  provide() {
    return {
      store: useStore()
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<any>): Promise<any> => {
    const { storeId, load } = context.store;

    try {

      console.log('shopId', !storeId.value);
      if (!storeId.value) {
        await load();
        console.log('shopId', storeId.value);
      }

      const filter = {
        shopId: storeId.value,
        page: params.input.page || 1,
        pageSize: params.input.itemsPerPage || 20,
        isToplevel: true
      };

      console.log('useFacet', filter);

      const categories = await context.$opencommerce.api.getCategory(filter);
      // const result = await context.$opencommerce.api.searchProducts(params);

      console.log('useFacet', categories);
      return {
        input: params.input,
        categories: categories.data,
        products: [],
        total: 0
      };
    } catch (e) {
      console.log('useFacet', e);
    }
  }
};

export default useFacetFactory<any>(factoryParams);
