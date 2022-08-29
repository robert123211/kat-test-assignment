import {defineConfig} from 'cypress';
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
import {addCucumberPreprocessorPlugin} from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  watchForFileChanges: false,
  e2e: {
    baseUrl: 'https://factory.katanamrp.com/',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: '**/*.feature',
    setupNodeEvents,
  },
});
