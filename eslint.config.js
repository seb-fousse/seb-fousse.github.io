import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    parserOptions: {
      ecmaVersion: "latest", // Allows for the parsing of modern ECMAScript features
      sourceType: "module", // Allows for the use of imports
      ecmaFeatures: {
        jsx: true, // Enable JSX
      },
    },
    plugins: ["@typescript-eslint", "react", "react-hooks"],
    extends: [
      "eslint:recommended", // Recommended ESLint rules
      "plugin:react/recommended", // Recommended React rules
      "plugin:react-hooks/recommended", // Recommended React Hooks rules
      "plugin:@typescript-eslint/recommended", // Recommended TypeScript rules
    ],
    rules: {
      // Override rules here, if necessary
    },
    settings: {
      react: {
        version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
      },
    },
  },
)
