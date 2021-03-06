const commonConfig = require('../webpack.common.js');
const merge = require('webpack-merge');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-knobs'],
  webpackFinal: async (config) => {
    return merge(config, commonConfig);
  },
};
