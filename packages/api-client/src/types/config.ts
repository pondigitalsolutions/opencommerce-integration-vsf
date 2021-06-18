import ApolloClient, { ApolloClientOptions } from 'apollo-client';

export type ApiConfig = {
    uri: string;
    accessTokenUri?: string;
}

export interface Config<T = any> {
    api: ApiConfig;
    client?: ApolloClient<T>;
    customOptions?: ApolloClientOptions<any>;
    currency: string;
    locale: string;
    getAccessToken: () => string;
}
