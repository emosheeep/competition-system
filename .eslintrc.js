const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/standard',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    semi: ['error', 'always'],
    'no-unused-vars': IS_PROD ? 'error' : 'warn',
    'no-console': IS_PROD ? 'warn' : 'off',
    'no-debugger': IS_PROD ? 'warn' : 'off',
    'prefer-promise-reject-errors': 'off',
    'comma-dangle': ['error', 'always-multiline'], // 行尾逗号
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
  },
};
