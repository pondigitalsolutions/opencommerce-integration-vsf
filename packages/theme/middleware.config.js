module.exports = {
  integrations: {
    opencommerce: {
      location: '@pondigitalsolutions/opencommerce-api/server',
      configuration: {
        api: {
          uri: process.env.OC_API_URI
        },
        currency: 'EUR',
        locale: 'EN'
      }
    }
  }
};
