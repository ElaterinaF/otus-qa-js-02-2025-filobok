module.exports = {
    env: {
      node: true,
      commonjs: true,
      es2021: true,
    },
    extends: ["airbnb-base", "plugin:prettier/recommended"], // Добавляем Prettier
    parserOptions: {
      ecmaVersion: "latest",
    },
    rules: {
      "no-console": "off", // Разрешить console.log (опционально)
      "prettier/prettier": ["error", { endOfLine: "auto" }], // Правила Prettier
    },
  };