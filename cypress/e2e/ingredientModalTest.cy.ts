import '@4tw/cypress-drag-drop';
import {
  TEST_URL
} from "../../src/utils/constants";

describe("service is available", () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
  });

  it('should open modal portal with ingredient info and close by click', () => {
    cy
      .get('[test-id="ingredientCard"]')
      .first()
      .click();
    cy
      .get('[id="react-modals"]')
      .contains('Детали ингредиента');
    cy
      .get('[test-id="modalCloseIconContainer"]')
      .find('path')
      .last()
      .click();
  })
});
