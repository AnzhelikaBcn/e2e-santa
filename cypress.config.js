const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin =
require ("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin =
require ("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

module.exports = defineConfig({
  projectId: 'tahm2o',
  video: false,
  env: {
    "13inch": {
      "viewportWidth": 1366,
      "viewportHeight": 768,
      "browser": "chrome"
    },
    "24inch": {
      "viewportWidth": 1920,
      "viewportHeight": 1080,
      "browser": "electrone"
    },
  },
  e2e: {
    baseUrl: "https://staging.lpitko.ru",
    testIsolation: false,
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      addCucumberPreprocessorPlugin(on, config);

      return config;
    },
     env: {
      myCookieHeader: "_ym_uid=1704920318237868458; _ym_d=1704920318; adrcid=A0ph72UbSweLvtiuf-7YZxA; uuid=11ae2277cda5f700%3A2; __upin=hSMTDItB6IVYUiGszVwZOA; lang=ru; _ym_isad=2; _buzz_fpc=JTdCJTIycGF0aCUyMiUzQSUyMiUyRiUyMiUyQyUyMmRvbWFpbiUyMiUzQSUyMi5zdGFnaW5nLmxwaXRrby5ydSUyMiUyQyUyMmV4cGlyZXMlMjIlM0ElMjJTdW4lMkMlMjAxMiUyMEphbiUyMDIwMjUlMjAxOCUzQTQyJTNBMzclMjBHTVQlMjIlMkMlMjJTYW1lU2l0ZSUyMiUzQSUyMkxheCUyMiUyQyUyMnZhbHVlJTIyJTNBJTIyJTdCJTVDJTIydWZwJTVDJTIyJTNBJTVDJTIyMDVhYTU5NDMwZmJlYWRiNTk0OGZjMjE3ZmFiYzNmZDMlNUMlMjIlMkMlNUMlMjJicm93c2VyVmVyc2lvbiU1QyUyMiUzQSU1QyUyMjEyMC4wJTVDJTIyJTdEJTIyJTdE; _buzz_aidata=JTdCJTIycGF0aCUyMiUzQSUyMiUyRiUyMiUyQyUyMmRvbWFpbiUyMiUzQSUyMi5zdGFnaW5nLmxwaXRrby5ydSUyMiUyQyUyMmV4cGlyZXMlMjIlM0ElMjJTdW4lMkMlMjAxMiUyMEphbiUyMDIwMjUlMjAxOCUzQTQyJTNBMzclMjBHTVQlMjIlMkMlMjJTYW1lU2l0ZSUyMiUzQSUyMkxheCUyMiUyQyUyMnZhbHVlJTIyJTNBJTIyJTdCJTVDJTIydWZwJTVDJTIyJTNBJTVDJTIyaFNNVERJdEI2SVZZVWlHc3pWd1pPQSU1QyUyMiUyQyU1QyUyMmJyb3dzZXJWZXJzaW9uJTVDJTIyJTNBJTVDJTIyMTIwLjAlNUMlMjIlN0QlMjIlN0Q=; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDE1ODQsImlhdCI6MTcwNTA4ODQwOCwiZXhwIjoxNzA1MDkyMDA4fQ.gjmFM1zsYptZcMTtiZcaCMO6QhQvXqdLUmBQhFtuYMQ"
    },
    
  },
});


