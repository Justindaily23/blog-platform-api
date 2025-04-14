module.exports = {
  env: {
    node: true,
    es2021: true,
  },

  extends: ['airbnb-base', 'plugin:prettier/recommended'],

  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always', // <-- this tells ESLint to allow .js extensions
      },
    ],
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json'],
      },
    },
  },
};
