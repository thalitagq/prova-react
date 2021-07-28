describe("Bets", () => {
  it("should make a mega-sena bet", () => {
    cy.get(".sc-fujyAs > a").click();
    cy.get(".iTNdSJ").click();
    for (let index = 0; index < 7; index++) {
      cy.get(".sc-khIgEk > div > :nth-child(1)").click();
      cy.get(".sc-Arkif").click();
    }

    cy.intercept("POST", "http://192.168.18.9:3333/bets").as("bets");

    cy.get(".sc-iBzEeX").click();

    cy.wait("@bets").then(({ response }) => {
      cy.log(response);
      expect(response.statusCode).to.eq(200);
    });

    cy.get(".sc-fFSPTT > .sc-ksluID").click();
  });

  it("shold reset bet", () => {
    cy.get(".sc-fujyAs > a").click();
    cy.get(".iTNdSJ").click();
    cy.get(".sc-khIgEk > div > :nth-child(1)").click();
    cy.get(".sc-khIgEk > div > :nth-child(2)").click();

    cy.get(".sc-fFSPTT > .sc-ksluID").click();
  });

  it("shold delete saved bet", () => {
    cy.get(".sc-fujyAs > a").click();
    cy.get(".iTNdSJ").click();
    cy.get(".sc-khIgEk > div > :nth-child(1)").click();
    cy.get(".sc-Arkif").click();
    cy.get(".sc-gXfVKN > svg").click();
    cy.get('[style="margin: auto;"]').should("have.text", "Carrinho vazio");

    cy.get(".sc-fFSPTT > .sc-ksluID").click();
  });

  it("should return an alert with message indicating that the cart couldn't be saved with total price under required", () => {
    cy.get(".sc-fujyAs > a").click();
    cy.get(".iTNdSJ").click();
    cy.get(".sc-khIgEk > div > :nth-child(1)").click();
    cy.get(".sc-Arkif").click();
    cy.get(".sc-iBzEeX").click();

    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("As apostas devem ser de no mínimo");
    });

    cy.get(".sc-fFSPTT > .sc-ksluID").click();
  });

  it("should return an alert with message indicating that the bet couldn't be saved due to incomplete game", () => {
    cy.get(".sc-fujyAs > a").click();
    cy.get(".sc-jJMGnK > :nth-child(1)").click();
    cy.get(".sc-Arkif").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("Jogo incompleto");
    });

    cy.get(".sc-fFSPTT > .sc-ksluID").click();
  });
});
