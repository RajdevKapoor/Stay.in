/// <reference types="cypress"/>

context("Home Page", ()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:3000/");
    });

    it("Checks if every component is loaded", ()=>{

        //Check if Navbar present
        cy.get("header").contains("Stay.in");

        //Check if Navbar has Menu
        cy.get(".chakra-menu__menu-button").click().get(".chakra-menu__menu-list").should('contain', "Home").and("contain","Search").and("contain",  "Buy Property").and("contain",  "Rent Property");
        
        //Check if Navbar has SignIn and SignUp
        cy.get(".chakra-button").should("contain", "Sign In").and("contain", "Sign Up");
        
        //Check if 6 Rent-able properties loaded
        cy.get("p").contains("RENT A HOME");
        cy.get(".rent").children("div").should("have.length", 6);

        //Check if 6 Sale-able properties loaded
        cy.get("p").contains("BUY A HOME");
        cy.get(".sale").children("div").should("have.length", 6);
    });


    

}) 