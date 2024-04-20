module.exports = {
  root: true,
  env: {
    "vue/setup-compiler-macros": true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
    "prettier",
  ],
  rules: {
    "vue/multi-word-component-names": "off",
  },
};
