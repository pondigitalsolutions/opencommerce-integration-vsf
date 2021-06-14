import { integrationPlugin } from '@vue-storefront/core';
import defaultConfig from '@pondigitalsolutions/opencommerce/nuxt/defaultConfig';

const moduleOptions = <%= serialize(options) %>;

export default integrationPlugin(({ app, integration }) => {
    integration.configure({ ...moduleOptions, ...defaultConfig })
});
