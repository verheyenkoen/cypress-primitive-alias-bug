it('should return the alias on the same page', () => {
  cy.visit('/')

  cy.wrap('some_text').as('someText')
  cy.get('a[href="/commands/querying"]:eq(4)').invoke('text').as('linkText')

  // Some actions and assertions
  cy.get('.dropdown-menu').should('not.be.visible')
  cy.contains('.dropdown-toggle', 'Commands').click()
  cy.get('.dropdown-menu').should('be.visible')
  cy.contains('.dropdown-toggle', 'Commands').click()
  cy.get('.dropdown-menu').should('not.be.visible')

  cy.get('@someText').should('eq', 'some_text')
  cy.get('@linkText').should('eq', 'within')
})

it('should return the alias on another page', () => {
  cy.visit('/')

  cy.wrap('some_text').as('someText')
  cy.get('a[href="/commands/querying"]:eq(4)').invoke('text').as('linkText')

  cy.contains('Cypress API').click()

  cy.get('@someText').should('eq', 'some_text')
  // This doesn't work
  cy.get('@linkText').should('eq', 'within')
})
