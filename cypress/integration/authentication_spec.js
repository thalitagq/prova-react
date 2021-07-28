///<reference types='cypress'/>

describe("Authentication", () => {
  it("shold login user", () => {
    cy.visit("http://localhost:3000/login");
    
    const email = Cypress.env("email");
    const password = Cypress.env("password")

    cy.get('[type="email"]').type(email);

    cy.get('[type="password"]').type(password);

    cy.intercept("POST", "**/sessions").as("session");

    cy.get(".sc-jSFjdj > .sc-fujyAs").click();

    cy.wait("@session").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.token).has.property("token");
      expect(response.body.token.token).is.not.null;
      expect(response.body.user_id).has.property("id");
      expect(response.body.user_id.id).is.not.null;
      expect(response.body.user_id).is.not.null;
    });
  });

  it.skip('should logout user', () => {
    cy.get(".sc-hBMUJo > :nth-child(2)").click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    })
  });
});
