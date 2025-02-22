// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  ignorePatterns: ["/dist/*"],
  plugins: ["unused-imports", "@typescript-eslint", "prettier", "react-native"],
  rules: {
    "prettier/prettier": ["warn", { endOfLine: "lf", singleQuote: false }],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": ["warn", { vars: "all" }],
    "@typescript-eslint/no-unused-vars": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        alphabetize: { order: "asc" }
      }
    ],
    "react-native/no-unused-styles": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/ban-ts-comment": "error",
    "react-native/no-inline-styles": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off"
  }
};
