const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
import { faker } from "@faker-js/faker";

describe("user can create a box and run it", () => {
  //пользователь 1 логинится
  //пользователь 1 создает коробку
  //пользователь 1 получает приглашение
  //пользователь 2 переходит по приглашению
  //пользователь 2 заполняет анкету
  //пользователь 3 переходит по приглашению
  //пользователь 3 заполняет анкету
  //пользователь 4 переходит по приглашению
  //пользователь 4 заполняет анкету
  //пользователь 1 логинится
  //пользователь 1 запускает жеребьевку
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;


  it("user logins and create a box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
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

  it("add participants", () => {
    cy.get(generalElements.submitButton).click();
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
    cy.clearCookies();
  });

  [
    { user: users.user2, wishes: "Пожелания для пользователя 2" },
    { user: users.user3, wishes: "Пожелания для пользователя 3" },
    { user: users.user4, wishes: "Пожелания для пользователя 4" },
  ].forEach(({ user, wishes }) => {
    it(`Подтверждение участия как ${user.username}`, () => {
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

  
  it("draw", () => {
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
  

});


// Cypress._.times(4, () => {
  //   describe("Description", () => {
  //     it.only('delete box', () => {
  //       cy.visit("/login");
  //       cy.login(users.userAutor.email, users.userAutor.password);

  //       cy.get(
  //         '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
  //       ).click();
  //       cy.get(':nth-child(1) > a.base--clickable > .user-card').first().click();
  //       cy.get(
  //         '.layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner'
  //       ).click();
  //       cy.contains("Архивация и удаление").click({ force: true });
  //       cy.get(':nth-child(2) > .form-page-group__main > .frm-wrapper > .frm').type("Удалить коробку");
  //       cy.get('.btn-service').click();


  //     });

  //   });
  // });

  /*
  after('delete box', () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);

    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
    ).click();
    cy.get(':nth-child(1) > a.base--clickable > .user-card').first().click();
    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner'
    ).click();
    cy.contains("Архивация и удаление").click({ force: true });
    cy.get(':nth-child(2) > .form-page-group__main > .frm-wrapper > .frm').type("Удалить коробку");
    cy.get('.btn-service').click();


  });
  */


  
