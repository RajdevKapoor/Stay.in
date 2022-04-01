/// <reference types="cypress"/>

context("Property Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/propertyform/");
  });

  it("Checks if elements of form loaded correctly", () => {
    cy.get(".chakra-stack css-owjkmg")
      .should("contain", "List Your Property!")
      .and("contain", "Fill these details to add your property");

    cy.get("label")
      .should("contain", "First Name")
      .should("contain", "Last Name")
      .should("contain", "Email address")
      .should("contain", "Property Name")
      .should("contain", "Monthly Rent")
      .should("contain", "Bed")
      .should("contain", "Bath")
      .should("contain", "Property Description");

    // cy.get(".search-filters")
    //   .children()
    //   .should("have.length", "11")
    //   .each(($filter) => {
    //     //cy.log($filter);
    //     cy.get($filter)
    //       .click()
    //       .get("select")
    //       .children()
    //       .should("have.length.at.least", 2);
    //   });

    cy.get(".firstName").type("Test");
    cy.get(".lastName").type("User");
    cy.get(".email").type("test@user.com");
  });
});
