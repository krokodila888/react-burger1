import '@4tw/cypress-drag-drop';
import {
  TEST_URL
} from "../../src/utils/constants";

describe("service is available", () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
  });

  it('should drag and drop ingredients from ingredients list to burger-constructor', () => {
    cy
      .get('[id="BurgerConstructor"]')
      .as('burger-constructor');

    cy.get('[test-id="ingredientCard"]').each(($el) => {
      cy.wrap($el).drag('@burger-constructor')
    })
  })
});
