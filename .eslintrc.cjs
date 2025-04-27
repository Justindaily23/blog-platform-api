module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true, // This tells ESLint to recognize Jest's globals
  },

  extends: ['airbnb-base', 'plugin:prettier/recommended'],

  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/test/**/*',
          '**/*.spec.js',
          'setup.js', // Add your test setup file here if needed
        ],
      },
    ],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'prettier/prettier': 'error',
    'no-console': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always', // <-- this tells ESLint to allow .js extensions
      },
    ],
    semi: ['error', 'always'],
    quotes: ['warn', 'single'],
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json'],
      },
    },
  },
};
