/// <reference types="cypress"/>

context("Property Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/propertyform/");
  });

  it("Checks if elements of form loaded correctly", () => {
    cy.get(".chakra-heading").should("contain", "List Your Property!");

    cy.get(".chakra-text").should(
      "contain",
      "Fill these details to add your property"
    );

    //Check if Latitude, Longitude Fields present
    cy.get("label")
      .should("contain", "Latitude")
      .should("contain", "Longitude");

    //Find the "Get Location" Button
    cy.get("Button").should("contain", "Get Location");

    //Click button
    cy.get(".location-button").click().first;

    //Check if Location Filled automatically
    cy.get('input[id="latitude"]').should("have.value", 29.6277764);
    cy.get('input[id="longitude"]').should("have.value", -82.3777229);
  });
});
