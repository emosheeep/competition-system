const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    semi: ['error', 'always'], // 分号
    camelcase: 'off',
    'no-new': 'off',
    'vue/no-unused-components': 'warn',
    'no-console': IS_PROD ? 'warn' : 'off',
    'no-debugger': IS_PROD ? 'error' : 'off',
    'no-unreachable': IS_PROD ? 'error' : 'warn', // 提前return
    'prefer-promise-reject-errors': 'off',
    'standard/no-callback-literal': 'off',
    'no-unused-vars': IS_PROD ? 'error' : 'warn',
    'comma-dangle': ['error', 'always-multiline'], // 末尾逗号
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always', // async箭头函数
    }],
  },
};
