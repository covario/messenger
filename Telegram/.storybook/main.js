const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.tsx',
    '../src/Components/**/*.stories.tsx',
  ],
  addons: [
    'storybook-addon-material-ui/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/preset-create-react-app'
  ],
  webpackFinal: async (config) => {
    // Support Typescript.
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [ [ 'react-app', {flow: false, typescript: true} ] ],
      },
      include: [
        path.resolve(__dirname, '..', 'src'),
        path.resolve(__dirname, '..', 'stories')
      ],
    });

    // Disable the Storybook internal-`.svg`-rule for components loaded from our app.
    const svgRule = config.module.rules.find((rule) => 'test.svg'.match(rule.test));
    svgRule.exclude = [ path.resolve(__dirname, '..', 'src') ];

    // Support SVG imports.
    config.module.rules.push({
      test: /\.svg$/,
      use: [ '@svgr/webpack' ],
      include: [
        path.resolve(__dirname, '..', 'src'),
      ]
    });

    return config;
  },
};
