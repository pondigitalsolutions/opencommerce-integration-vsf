import path from 'path';

// eslint-disable-next-line func-names
export default function (moduleOptions) {
  this.extendBuild((config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias['@pondigitalsolutions/opencommerce-api$'] = require.resolve('@pondigitalsolutions/opencommerce-api');
  });

  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });
}
