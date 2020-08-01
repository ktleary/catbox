module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2020': true,
    'mocha': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 11
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'describe|should|expect',
      },
    ],
  }
}
