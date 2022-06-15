describe("Recipes Overview app", () => {
  beforeEach(() => {
    cy.intercept("GET", "/recipes", {
      forceNetworkError: true,
    });
    cy.visit("http://localhost:3000");
  });

  it("properly shows an error message when something breaks", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="errorMessage"]').should("be.visible");
  });
});
