export type ApiConfig = {
    uri: string;
    accessTokenUri: string;
}

export type Config = {
    api: ApiConfig;
    currency: string;
    locale: string;
    getAccessToken: () => string;
}
