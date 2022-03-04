/// <reference types="cypress"/>





context("Search Page", ()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:3000/search");
    });

    it("Checks Searching with filters", ()=>{
        cy.get(".chakra-text").contains("Search Property By Filters").click();
        cy.get(".search-filters").children().should("have.length", "11").each($filter =>{
            //cy.log($filter);
            cy.get($filter).click().get("select").children().should("have.length.at.least", 2);
        });

    });


    

}) 