import { Order } from '../types';
import { useMakeOrderFactory, UseMakeOrderFactoryParams, Context } from '@vue-storefront/core';

const factoryParams: UseMakeOrderFactoryParams<Order> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  make: async (context: Context, { customQuery }): Promise<Order> => {
    console.log('Mocked: makeOrder');
    return {
      id: '123-456-7890'
    };
  }
};

export default useMakeOrderFactory<Order>(factoryParams);
