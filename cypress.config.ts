import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'src/Components/Packages/e2e-test/*.cy.?s',
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
