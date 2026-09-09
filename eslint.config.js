import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // `krafo_api` is the Express backend — its own repository, its own tooling,
  // and Node/CommonJS rather than browser ESM. Linting it under the browser
  // config below produced ~110 bogus "'process' is not defined" errors and
  // drowned out every real finding in the frontend.
  globalIgnores(['dist', 'krafo_api', 'react-device-mockup']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      // Supplies `react/jsx-uses-vars`, without which ESLint cannot tell that
      // JSX counts as using a binding — every component imported and used only
      // in markup (`motion`, icon components, and so on) was being reported as
      // an unused variable.
      react.configs.flat['jsx-runtime'],
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    settings: { react: { version: 'detect' } },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // The rule that actually teaches no-unused-vars about JSX. The
      // `jsx-runtime` preset above only disables the old react-in-scope rules,
      // it does not enable this one, and the full `recommended` preset drags in
      // prop-types checks this codebase does not use. So: just this one.
      'react/jsx-uses-vars': 'error',
      // Destructured props are matched too, so `{ icon: Icon }` in a callback
      // signature is treated the same as a capitalised import.
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^[A-Z_]' },
      ],
    },
  },
  // Vite's config runs in Node, not the browser.
  {
    files: ['vite.config.js', 'eslint.config.js'],
    languageOptions: { globals: globals.node },
  },
])
