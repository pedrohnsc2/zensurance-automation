import { faker } from '@faker-js/faker';

const itemName = '.inventory_item_name';

describe('Add a product to the cart and go to checkout', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))
    });

    const addAndCheckoutProduct = (username, password) => {
        cy.login(username, password)
        cy.dataTest('add-to-cart-sauce-labs-backpack').click()
        cy.get(itemName).then((text) => {
            const returnedItemName = text.first().text()
            cy.get('.shopping_cart_link').click()
            cy.get(itemName).should('have.text', returnedItemName)
            cy.dataTest('checkout').click()
            cy.fillYourInformation(faker.name.firstName(), faker.name.lastName(), faker.address.zipCode())
            cy.get(itemName).should('have.text', returnedItemName)
            cy.dataTest('finish').click()
            cy.get('span.title').should('have.text', 'Checkout: Complete!')
            cy.url().should('be.equal', Cypress.env('baseUrl') + '/checkout-complete.html')
        });
    };

    it('Add any product to the cart and make the checkout', () => {
        addAndCheckoutProduct(Cypress.env('user'), Cypress.env('password'))
    });

    it('Add any product to the cart and make the checkout with glitch performance user issue', () => {
        addAndCheckoutProduct('performance_glitch_user', Cypress.env('password'))
    });

    afterEach(() => {
        cy.screenshot()
    });
});

describe('Try to use the saucedemo with the problem user', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))
        cy.login('problem_user', Cypress.env('password'))
    });

    it('try to remove item from cart', () => {
        cy.dataTest('add-to-cart-sauce-labs-backpack').click()
        cy.dataTest('remove-sauce-labs-backpack').click()
        cy.dataTest('remove-sauce-labs-backpack').should('not.be.visible')
    });

    it('should not have a dog img in the inventory', () => {
        cy.get('.inventory_item_img').should('contains', '/static/media/sauce-backpack-1200x1500.34e7aa42.jpg')
    });
});