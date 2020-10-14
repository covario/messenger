module.exports = {
  extends: [
    'react-app',
    'prettier',
    'prettier/react',
  ],
  rules: {
    'prettier/prettier': 2,
  },
  overrides: [
    {
      files: [
        'src/**/*.ts',
        'src/**/*.tsx',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
        project: './tsconfig.json'
      },
      plugins: ['@typescript-eslint', 'prettier'],
      extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        // Maybe some more things to consider:
        // https://github.com/DianaSuvorova/eslint-plugin-react-redux
        // https://github.com/mysticatea/eslint-plugin-eslint-comments
        // https://github.com/selaux/eslint-plugin-filenames
        'prettier/@typescript-eslint',
        'prettier/babel',
      ],
      rules: {
        'object-curly-newline': ['error', { ImportDeclaration: { multiline: true, minProperties: 6 }}],
        'import/prefer-default-export': 0,
        'import/no-default-export': 2,
      },
    },
    {
      files: [
        'stories/**/*stories.tsx',
        'src/**/*stories.tsx',
      ],
      rules: {
        'import/prefer-default-export': 0,
        'import/no-default-export': 0,
      }
    }
  ],
};
