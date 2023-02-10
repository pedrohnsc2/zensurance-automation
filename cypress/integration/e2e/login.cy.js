describe('Login scenarios', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))
    })

    it('Logs in successfully with valid credentials', () => {
        cy.login(Cypress.env('user'), Cypress.env('password'))
        cy.contains('.title', 'Products').should('be.visible').and('have.text', 'Products')
    })

    it('Displays an error message with invalid credentials', () => {
        cy.login('test', 'test')
        cy.dataTest('error').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Displays an error message with locked out user', () => {
        cy.login('locked_out_user', Cypress.env('password'))
        cy.dataTest('error').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
    })

    it('Displays an error message with blank password', () => {
        cy.dataTest('username').type(Cypress.env('user'))
        cy.dataTest('login-button').click()
        cy.dataTest('error').should('have.text', 'Epic sadface: Password is required')
    })

    it('Displays an error message with blank email', () => {
        cy.dataTest('password').type(Cypress.env('password'))
        cy.dataTest('login-button').click()
        cy.dataTest('error').should('have.text', 'Epic sadface: Username is required')
    })

    it('Displays an error message with blank email and password', () => {
        cy.dataTest('login-button').click()
        cy.dataTest('error').should('have.text', 'Epic sadface: Username is required')
    })
})