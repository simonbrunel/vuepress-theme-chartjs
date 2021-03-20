const MAX_LEN = {code: 100, ignoreUrls: true};

module.exports = {
  root: true,

  env: {
    es6: true,
    node: true,
  },

  extends: [
    'chartjs',
    'plugin:vue/recommended',
  ],

  rules: {
    // Stylistic Issues
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': ['error', MAX_LEN],

    // Vue
    'vue/max-len': ['error', MAX_LEN],
  },
};
