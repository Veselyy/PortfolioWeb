module.exports = {
  testEnvironment: 'jsdom',
  // Unit tests live in test/unit/, mirroring the src/ tree; e2e specs under test/e2e/ are
  // Playwright's and must stay out of Jest's discovery.
  roots: ['<rootDir>/test/unit'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
};
