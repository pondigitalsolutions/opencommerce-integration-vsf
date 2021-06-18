import { ComputedRef } from '@vue/composition-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface UseStore<STORE> {
    storeId: ComputedRef<string>;
    load: () => Promise<void>;
    loading: ComputedRef<boolean>;
}
