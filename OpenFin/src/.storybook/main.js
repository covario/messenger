const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.tsx',
    '../src/components/**/*.stories.tsx',
  ],
  addons: ['@storybook/addon-actions/register', '@storybook/addon-knobs/register'],
  webpackFinal: async (config) => {
    // Support Typescript.
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      include: [
        path.resolve(__dirname, '..', 'src'),
        path.resolve(__dirname, '..', 'stories')
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    // Support Sass.
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: [
        path.resolve(__dirname, '..', 'src'),
        path.resolve(__dirname, '..', 'stories')
      ],
    });

    // Disable the Storybook internal-`.svg`-rule for components loaded from our app.
    const svgRule = config.module.rules.find((rule) => 'test.svg'.match(rule.test));
    svgRule.exclude = [path.resolve(__dirname, '..', 'src')];

    // Support SVG imports.
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
      include: [
        path.resolve(__dirname, '..', 'src'),
      ]
    });

    return config;
  },
};
