it('should return the alias on the same page', () => {
  cy.visit('/')

  cy.wrap('some_text').as('someText')
  cy.get('a[href="/commands/querying"]:eq(4)').invoke('text').as('linkText')

  // Some actions and assertions on the same page
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

it('should return the alias on when returning to the original page', () => {
  cy.visit('/')

  cy.wrap('some_text').as('someText')
  cy.get('a[href="/commands/querying"]:eq(4)').invoke('text').as('linkText')

  cy.contains('Cypress API').click()
  cy.location('pathname').should('eq', '/cypress-api')

  cy.visit('/')

  cy.get('@someText').should('eq', 'some_text')
  // It does work when you return to the page
  cy.get('@linkText').should('eq', 'within')
})

it('should have the alias on the this-object', () => {
  cy.visit('/')

  cy.wrap('some_text').as('someText')
  cy.get('a[href="/commands/querying"]:eq(4)').invoke('text').as('linkText')

  cy.contains('Cypress API').click()

  cy.get('@someText').should('eq', 'some_text')
  // This obviously doesn't work with lambda's
  cy.then(function () {
    return this.linkText
  }).should('eq', 'within')
})
