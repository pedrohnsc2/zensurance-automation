Cypress.Commands.add('dataTest', value => {
    return cy.get(`[data-test="${value}"]`)
})

Cypress.Commands.add('login', (email, password) => { 
    cy.dataTest('username').type(email, { log: false })
    cy.dataTest('password').type(password, { log: false })
    cy.dataTest('login-button').click()
})

Cypress.Commands.add('fillYourInformation', (firstName, lastName, postalCode) => { 
    cy.dataTest('firstName').type(firstName)
    cy.dataTest('lastName').type(lastName)
    cy.dataTest('postalCode').type(postalCode)
    cy.dataTest('continue').click()
})