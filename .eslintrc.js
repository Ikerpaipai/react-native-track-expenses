/* eslint-env node */
module.exports = {
  extends: ['expo', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'never'],
  },
}
