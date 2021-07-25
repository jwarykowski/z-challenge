describe("sanity test", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:3000");
  });

  it("has admin role selected as default", () => {
    cy.get('[data-testid="Admin"]').should('be.checked')
    cy.get('[data-testid="Manager"]').not('be.checked')
  });

  it("shows customers with admin role", () => {
    cy.contains('John Smith').should('be.visible')
    cy.contains('Adam Muller').should('be.visible')
    cy.contains('Peri Smith').should('be.visible')
  });

  it("show customers with manager role", () => {
    cy.get('[data-testid="Manager"]').click()
    cy.get('[data-testid="Admin"]').not('be.checked')
    cy.get('[data-testid="Manager"]').should('be.checked')
    cy.contains('Nathan Smith').should('be.visible')
    cy.contains('Glen Tailor').should('be.visible')
    cy.contains('Joe Tailor').should('be.visible')
    cy.contains('Chris Su').should('be.visible')
  });
});
