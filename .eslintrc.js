module.exports = {
  globals: {
    GlRenderer: true,
    glDoodle: true,
    ControlKit: true,
  },
  extends: 'airbnb-base',
  env: {
    browser: true,
    mocha: false,
  },
  plugins: ['html'],
  rules: {
    complexity: ['warn', 25],
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'import/extensions': 'off',
    'comma/dangle': 'off',
  },
};
