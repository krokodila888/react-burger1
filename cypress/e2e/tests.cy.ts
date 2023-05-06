import '@4tw/cypress-drag-drop';

describe("service is available", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
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

  it('should drag and drop ingredients from ingredients list to burger-constructor', () => {
    cy
      .get('[id="BurgerConstructor"]')
      .as('burger-constructor');

    cy
      .get('[test-id="ingredientCard"]')
      .eq(0)
      .drag('@burger-constructor');
    cy
      .get('[test-id="ingredientCard"]')
      .eq(3)
      .drag('@burger-constructor');
    cy
      .get('[test-id="ingredientCard"]')
      .eq(4)
      .drag('@burger-constructor');
    cy
      .get('[test-id="ingredientCard"]')
      .eq(5)
      .drag('@burger-constructor');
  })

  it('should login user and add new order, open order modal, then close it', () => {
    cy
      .get('[id="BurgerConstructor"]')
      .as('burger-constructor');
    cy.get('[id="react-modals"]').as('modal');

    cy
      .get('[test-id="ingredientCard"]')
      .eq(0)
      .drag('@burger-constructor');
    cy
      .get('[test-id="ingredientCard"]')
      .eq(3)
      .drag('@burger-constructor');
    cy
      .get('[test-id="ingredientCard"]')
      .eq(4)
      .drag('@burger-constructor');

    cy
      .get('[test-id="burgerConstructorButton"]')
      .find('button')
      .contains('Оформить заказ')
      .click();

    cy
      .get('[type="email"]')
      .type('krokodila888@yandex.ru');
    cy
      .get('[type="password"]')
      .type('kolbasakolbasa');
    cy
      .get('button')
      .contains('Войти')
      .click();

    cy
      .get('[test-id="burgerConstructorButton"]')
      .find('button')
      .click();
    
    // eslint-disable-next-line cypress/no-unnecessary-waiting
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
