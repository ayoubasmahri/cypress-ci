import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config), {
        resultsDir: "allure-results",
      };
      return config;
    },
  },
});
