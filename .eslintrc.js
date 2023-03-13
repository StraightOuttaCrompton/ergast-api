module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["plugin:@typescript-eslint/recommended", "prettier"],
    plugins: ["@typescript-eslint/eslint-plugin"],
    parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
    },
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: [".eslintrc.js"],
    rules: {
        "no-var": "error",
        "space-in-parens": "error",
        "no-multiple-empty-lines": "error",
        "prefer-const": "error",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-comment": "off",
    },
};
