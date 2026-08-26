import reactConfig from 'vesely-dev-config/eslint/react';

export default [
  ...reactConfig,
  {
    // Playwright fixtures hand a value to the test by calling `use(value)`. The React rule
    // matches on the name alone, so it reads that as a hook called outside a component.
    // Nothing under test/e2e is React.
    files: ['test/e2e/**/*.ts'],
    rules: { 'react-hooks/rules-of-hooks': 'off' },
  },
];
