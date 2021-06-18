import { integrationPlugin } from '@vue-storefront/core';
import defaultConfig from '@pondigitalsolutions/opencommerce/nuxt/defaultConfig';

const moduleOptions = <%= serialize(options) %>;

export default integrationPlugin(({ app, integration }) => {
    const cartCookieName = moduleOptions.cookies?.cartCookieName || defaultConfig.cookies.cartCookieName;
    const storeCookieName = moduleOptions.cookies?.storeCookieName || defaultConfig.cookies.storeCookieName;

    const getCartId = () => app.$cookies.get(cartCookieName);
    const setCartId = (id) => {
        if (!id) {
            app.$cookies.remove(cartCookieName);
            return;
        }
        app.$cookies.set(cartCookieName, id);
    };

    const settings = {
        ...moduleOptions,
        app,
        state: {
            getCartId,
            setCartId,
        }
    }

    integration.configure('opencommerce', settings);
});
