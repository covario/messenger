module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    // Maybe some more things to consider:
    // https://github.com/DianaSuvorova/eslint-plugin-react-redux
    // https://github.com/mysticatea/eslint-plugin-eslint-comments
    // https://github.com/selaux/eslint-plugin-filenames
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/babel',
    'prettier/flowtype',
    'prettier/react',
  ],
  rules: {
    'react/display-name': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/no-default-export': 2,
    'no-unused-vars': 0,
    'react/prop-types': 0,
    'no-void': 0,

    // Temporary. See: https://github.com/typescript-eslint/typescript-eslint/issues/2077
    '@typescript-eslint/camelcase': 0,
  },
  env: {
    browser: true,
  },
  settings: {
    'react': {
      'version': 'detect'
    },
    'import/resolver': {
      node: {
        paths: ['~'],
      },
    },
  },
  overrides: [
    {
      files: [
        'src/pages/**/*.tsx',
        'src/pages/api/*.ts',
      ],
      rules: {
        'import/prefer-default-export': 2,
        'import/no-default-export': 0,
      }
    },
    {
      files: [
        'stories/**/*stories.tsx',
        'src/components/**/*stories.tsx',
      ],
      rules: {
        'import/prefer-default-export': 0,
        'import/no-default-export': 0,
      }
    }
  ]
};
