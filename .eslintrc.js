module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  plugins: ['prettier'],
  extends: ['plugin:vue/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'vue/valid-template-root': 'off'
  }
}
