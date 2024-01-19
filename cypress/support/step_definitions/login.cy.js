import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { When } from "@badeball/cypress-cucumber-preprocessor";
import { Then } from "@badeball/cypress-cucumber-preprocessor";

//const package1 = require('../../package.json'); // Путь к вашему файлу package.json

Given('I get the version from package.json', () => {
  // Сохраняем версию в переменной окружения, чтобы использовать в тестах
  Cypress.env('packageVersion', package1e.version);
});

Given("user is on secret santa login page", function () {
    cy.visit("/login");
});

Given("user logs in as {string} and {string}", function (login, password) {
    cy.login(login, password);
});

When("user logs in with table", function (dataTable) {
    cy.login(dataTable.hashes()[0].login, dataTable.hashes()[0].password);
});

Then("user is on dashboard page", function () {
    cy.contains("Создать коробку").click();
});