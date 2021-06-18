import {
  Context,
  sharedRef,
  Logger,
  configureFactoryParams, FactoryParams
} from '@vue-storefront/core';
import { computed } from '@vue/composition-api';
import { UseStore } from '../composables';

export interface UseStoreFactoryParams<STORE> extends FactoryParams {
    load: (context: Context) => Promise<STORE>;
}

export function useStoreFactory<STORE>(factoryParams: UseStoreFactoryParams<STORE>) {
  return function useStore(cacheId = ''): UseStore<STORE> {
    const ssrKey = cacheId || 'useStoreFactory';
    const storeId = sharedRef<string>(null, `${ssrKey}-id`);
    const loading = sharedRef<boolean>(false, `${ssrKey}-loading`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const load = async () => {
      Logger.debug(`useStore/${ssrKey}/load`);
      loading.value = true;
      try {
        console.log('factory', 'getting data');
        storeId.value = await _factoryParams.load();
      } finally {
        loading.value = false;
      }
    };

    return {
      load,
      storeId: computed(() => storeId.value),
      loading: computed(() => loading.value)
    };
  };
}
