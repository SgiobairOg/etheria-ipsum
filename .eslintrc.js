module.exports = {
  env: {
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'never'],
    // enable additional rules
    'linebreak-style': ['error', 'unix'],
    // node specific
    'global-require': 'error',
    'handle-callback-err': 'error',
    // override default options for rules from base configurations
    'no-cond-assign': ['error', 'always'],
    // disable rules from base configurations
    'arrow-body-style': 'off',
    'no-inner-declarations': 'off',
    'no-redeclare': 'off',
    // style specific
    'no-trailing-spaces': 'error',
    'no-unused-vars': ['error', { 'args': 'none' }]
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018
  }
}
