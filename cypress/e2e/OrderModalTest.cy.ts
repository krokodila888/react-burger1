import '@4tw/cypress-drag-drop';
import {
  TEST_URL,
  USER_EMAIL,
  USER_PASS
} from "../../src/utils/constants";

describe("service is available", () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
  });

  it('should login user and add new order, open order modal, then close it', () => {
    cy
      .get('[id="BurgerConstructor"]')
      .as('burger-constructor');
    cy
      .get('[test-id="ingredientCard"]')
      .as('ingredient');
    cy.get('[id="react-modals"]').as('modal');

    cy.get('[test-id="ingredientCard"]').each(($el) => {
      cy.wrap($el).drag('@burger-constructor')
    })

    cy
      .get('[test-id="burgerConstructorButton"]')
      .find('button')
      .contains('Оформить заказ')
      .click();

    cy
      .get('[type="email"]')
      .type(USER_EMAIL);
    cy
      .get('[type="password"]')
      .type(USER_PASS);
    cy
      .get('button')
      .contains('Войти')
      .click();

    cy
      .get('[test-id="burgerConstructorButton"]')
      .find('button')
      .click();
    
    cy
      .wait(20000)
      .get('[id="react-modals"]')
      .contains('Ваш заказ начали готовить');
    cy
      .get('[test-id="modalCloseIconContainer"]')
      .find('path')
      .last()
      .click();
  })
});
