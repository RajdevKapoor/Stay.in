/// <reference types="cypress"/>
import 'cypress-file-upload'
context("Property Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/propertyform/");
  });

  const file = "house.jpg";
  const llText = "A very very very long text that wpuld probabaly be too large for yu to read or maybe too long for me to type. But you know I'm only doung my typing preactice by this rather than testing."
  it("Checks if elements of form loaded correctly", () => {
    cy.get(".chakra-heading").should("contain", "List Your Property!");

    cy.get(".chakra-text").should(
      "contain",
      "Fill these details to add your property"
    );

    // Checks for Correct Labels
    cy.get('label[id="firstName-label"]')
      .should("contain", "First Name")

      .get('label[id="lastName-label"]')
      .should("contain", "Last Name")

      .get('label[id="email-label"]')
      .should("contain", "Email address")

      .get('label[id="propertyName-label"]')
      .should("contain", "Property Name")

      .get('label[id="monthlyRent-label"]')
      .should("contain", "Monthly Rent")

      .get('label[id="bed-label"]')
      .should("contain", "Bed")

      .get('label[id="bath-label"]')
      .should("contain", "Bath")

      .get('label[id="description-label"]')
      .should("contain", "Description")
      
      .get('input[id="imageFile"')
      .should("contain", "");

    cy.get('input[id="firstName"]')
      .type("Test")
      .should("have.value", "Test")

      .get('input[id="lastName"]')
      .type("User")
      .should("have.value", "User")

      .get('input[id="email"]')
      .type("test@user.com")
      .should("have.value", "test@user.com")

      .get('input[id="propertyName"]')
      .type("The Testing Apartments")
      .should("have.value", "The Testing Apartments")

      .get('input[id="monthlyRent"]')
      .type("Hundred")
      .should("have.value", "")
      .type(100)
      .should("have.value", 100)

      .get('input[id="bed"]')
      .type("Three")
      .should("have.value", "")
      .type(3)
      .should("have.value", 3)

      .get('input[id="bath"]')
      .type("Four")
      .should("have.value", "")
      .type(4)
      .should("have.value", 4)

      .get('input[id="description"]')
      .type(llText)   
      .should("have.value", llText);
      
      cy.get('input[id="imageFile"')
      .attachFile(file);

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

    // cy.get(".firstName").type("Test");
    // cy.get(".lastName").type("User");
    // cy.get(".email").type("test@user.com");
  });
});
