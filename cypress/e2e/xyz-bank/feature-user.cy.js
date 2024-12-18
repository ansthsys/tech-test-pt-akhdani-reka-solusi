/// <reference types="cypress" />

describe("Feature Manager", () => {
  const url = "https://globalsqa.com/angularJs-protractor/BankingProject/#";

  context("in home page", () => {
    beforeEach(() => {
      cy.visit(`${url}/login`);
    });

    it("should success open website for the first time", () => {
      cy.visit(`${url}/login`);
      cy.get("button[class='btn btn-primary btn-lg']").should("have.length", 2);
      cy.get("button[class='btn btn-primary btn-lg']")
        .first()
        .should("have.text", "Customer Login");
      cy.get("button[class='btn btn-primary btn-lg']")
        .last()
        .should("have.text", "Bank Manager Login");
    });

    it("should success login and open dashboard user page", () => {
      cy.visit(`${url}/login`);
      cy.get("button[class='btn btn-primary btn-lg']").first().click();
      cy.get("select").select("Hermoine Granger");
      cy.get("button[type='submit'][class='btn btn-default']").click();
      cy.get("div")
        .contains("Welcome Hermoine Granger")
        .should("have.length.at.least", 1);
    });
  });

  context("in dashboard manager page", () => {
    beforeEach(() => {
      cy.visit(`${url}/customer`);
      cy.get("select").select("Hermoine Granger");
      cy.get("button[type='submit'][class='btn btn-default']").click();
    });

    it("should success change account", () => {
      cy.get("select[id='accountSelect']")
        .select("1002")
        .should("have.value", "number:1002");
    });

    it("should success read list transactions", () => {
      cy.get("select[id='accountSelect']").select("1001");
      cy.get("button[class='btn btn-lg tab']").first().click();
      cy.get("table")
        .should("have.length", 1)
        .find("tbody")
        .find("tr")
        .should("have.length.at.least", 1);
    });

    it("should success filter list transactions", () => {
      cy.get("select[id='accountSelect']").select("1001");
      cy.get("button[class='btn btn-lg tab']").first().click();
      cy.get("input[type='datetime-local'][id='start']").type(
        "2015-07-28T00:00"
      );
      cy.get("input[type='datetime-local'][id='end']").type("2024-12-18T00:00");
      cy.get("table")
        .should("have.length", 1)
        .find("tbody")
        .find("tr")
        .should("have.length.at.least", 1);
    });

    it("should success reset filter list transactions", () => {
      cy.get("select[id='accountSelect']").select("1001");
      cy.get("button[class='btn btn-lg tab']").first().click();
      cy.get("input[type='datetime-local'][id='start']").type(
        "2015-07-28T00:00"
      );
      cy.get("input[type='datetime-local'][id='end']").type("2024-12-18T00:00");
      cy.get("button[class='btn'][ng-show='showDate']").click();
      cy.get("table")
        .should("have.length", 1)
        .find("tbody")
        .find("tr")
        .should("have.length.at.least", 1);
    });

    it("should success doing deposit", () => {
      cy.get("select[id='accountSelect']").select("1001");
      cy.get("button[class='btn btn-lg tab'][ng-class='btnClass2']").click();
      cy.get("input[type='number'][placeholder='amount']").type(300000);
      cy.get("button[class='btn btn-default'][type='submit']")
        .click()
        .then(() => {
          cy.get("span[ng-show='message']").should(
            "have.text",
            "Deposit Successful"
          );
        });
    });

    it("should success doing withdrawl", () => {
      cy.get("select[id='accountSelect']").select("1001");
      cy.get("button[class='btn btn-lg tab']").last().click();
      cy.get("input[type='number'][placeholder='amount']").type(5000);
      cy.get("button[class='btn btn-default'][type='submit']")
        .click()
        .then(() => {
          cy.get("span[ng-show='message']").should(
            "have.text",
            "Transaction successful"
          );
        });
    });

    it("should success logout account", () => {
      cy.get("button[class='btn logout']")
        .click()
        .then(() => {
          cy.get("select").should("have.length", 1);
        });
    });
  });
});
