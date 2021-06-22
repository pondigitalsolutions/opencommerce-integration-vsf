import { Context } from '@vue-storefront/core';
import { Store } from '@pondigitalsolutions/opencommerce-api/src/types/store';
import { useStoreFactory, UseStoreFactoryParams } from '../types/factories/useStoreFactory';

const factoryParams: UseStoreFactoryParams<Store> = {
  load: async (context: Context) => {
    const { data } = await context.$opencommerce.api.getStore();

    return data.primaryShopId || null;
  }
};

export default useStoreFactory<any>(factoryParams);
