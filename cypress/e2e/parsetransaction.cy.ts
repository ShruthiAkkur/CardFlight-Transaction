describe("Transaction Form Flow", () => {
  it("submits a transaction and displays result", () => {
    cy.visit("/"); 

    cy.get("input[placeholder='Enter transaction number']")
      .type("103JCB502QS316COSTSAVERGROCERY20564.80");

    cy.get("button").contains("Submit").click();

    cy.contains("Merchant").should("exist"); 
  });

  it("throws error for invalid transaction", () => {
    cy.visit("/");

    cy.get("input[placeholder='Enter transaction number']")
      .type("INVALID_STRING");

    cy.get("button").contains("Submit").click();

    cy.contains("Error").should("exist");
  });
});