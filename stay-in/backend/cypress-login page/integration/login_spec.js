describe('login', function(){
    this.beforeEach(()=>{
            cy.visit('http://localhost:3000/signin')  // specify full URL if baseUrl is null or the domain is different the baseUrl
            // Check if the Sign In page loads correctly
            cy.contains('Email address');
            cy.contains('Password');
        })

    it('correctLogin', function(){
        cy.visit('localhost:3000/signin')

        //Enter Details
        cy.findByTitle('Email address').type('Shivam')
        cy.findByTitle('Password').type('SG@123')
            
        //Press Sign in button
        cy.get('button:contains("Sign in")').click()

        //Login Successful
        cy.url().should('eq', "http://localhost:3000/signin")
    })
})
