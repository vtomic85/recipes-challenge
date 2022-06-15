describe("Recipes Overview app", () => {
  beforeEach(() => {
    cy.intercept("GET", "/recipes/*", { fixture: "recipes.json" });
    cy.visit("http://localhost:3000");
  });

  it("has a heading with correct text", () => {
    cy.get('[data-testid="h1"]').should("have.text", "Recipes Overview");
  });

  it("has a visible filter field", () => {
    cy.get('[data-testid="filterInputField"]').should("be.visible");
  });

  it("has a filter field which can be focused", () => {
    cy.get('[data-testid="filterInputField"]').click();
    cy.get('[data-testid="filterInputField"]').should("have.focus");
  });

  it("has a filter field which correctly filters one recipe based on the title", () => {
    cy.get('[data-testid="filterInputField"]').click().type("octopus");
    cy.get('[data-testid="listOfRecipes"]')
      .children("li")
      .should("have.length", 1);
  });

  it("has a filter field which correctly filters multiple recipes based on the title", () => {
    cy.get('[data-testid="filterInputField"]').click().type("delicious");
    cy.get('[data-testid="listOfRecipes"]')
      .children("li")
      .should("have.length", 5);
  });

  it("has working pagination", () => {
    cy.get('[data-testid="paginationButton2"]').click();
    cy.get('[data-testid="listOfRecipes"]')
      .children("li")
      .should("have.length", 5);
  });
});
