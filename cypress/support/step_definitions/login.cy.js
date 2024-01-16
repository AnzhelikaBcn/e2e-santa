import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { When } from "@badeball/cypress-cucumber-preprocessor";
import { Then } from "@badeball/cypress-cucumber-preprocessor";

const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
import { faker } from "@faker-js/faker";

let newBoxName, wishes, maxAmount, currency, inviteLink;

Given("user is logged in", () => {
  cy.visit("/login");
  cy.login(users.userAutor.email, users.userAutor.password);
});

When("user creates a box", () => {
  newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  maxAmount = 50;
  currency = "Евро";

  cy.contains("Создать коробку").click();
  cy.get(boxPage.boxNameField).type(newBoxName);
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.sixthIcon).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.giftPriceToggle).check({ force: true });
  cy.get(boxPage.maxAnount).type(maxAmount);
  cy.get(boxPage.currency).select(currency);
  cy.get(generalElements.arrowRight).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
  cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
    .invoke("text")
    .then((text) => {
      expect(text).to.include("Участники");
      expect(text).to.include("Моя карточка");
      expect(text).to.include("Подопечный");
    });
});

When("user adds participants", () => {
  cy.get(generalElements.submitButton).click();
  cy.get(invitePage.inviteLink)
    .invoke("text")
    .then((link) => {
      inviteLink = link;
    });
  cy.clearCookies();
});

Then("each participant confirms participation", (dataTable) => {
  dataTable.hashes().forEach(({ user, wishes }) => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.contains("войдите").click();
    cy.login(user.email, user.password);
    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.submitButton).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });
});

When("user initiates the draw", () => {
  cy.visit("/login");
  cy.login(users.userAutor.email, users.userAutor.password);
  cy.get(
    '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
  ).click();
  cy.get(':nth-child(4) > a.base--clickable > .user-card').click({ force: true });
  cy.get('a > .txt-secondary--med').click({ force: true });
  cy.get('.btn-main').click();
  cy.get('.santa-modal_content_buttons > .btn-main').click();
  cy.get('.picture-notice__hint > a > .base--clickable').click();
});