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

    it("should success login and open dashboard manager page", () => {
      cy.visit(`${url}/login`);
      cy.get("button[class='btn btn-primary btn-lg']").last().click();
      cy.get("button[class='btn btn-lg tab']").should("have.length", 3);
    });
  });

  context("in dashboard manager page", () => {
    beforeEach(() => {
      cy.visit(`${url}/manager`);
    });

    it("should fail create customer with invalid data", () => {
      const stub = cy.stub();
      cy.on("window:alert", stub);
      cy.get("button[class='btn btn-lg tab']").first().click();
      cy.get("input[type='text'][placeholder='First Name']").type(
        "!@&(*)_)*(_"
      );
      cy.get("input[type='text'][placeholder='Last Name']").type("__++-=-=-");
      cy.get("input[type='text'][placeholder='Post Code']").type(
        "kokokokoasdasd"
      );
      cy.get("button[class='btn btn-default']")
        .click()
        .then(() => {
          expect(stub).not.to.have.been.calledWithMatch(
            "Customer added successfully with customer id"
          );
        });
    });

    it("should success create customer with valid data", () => {
      const stub = cy.stub();
      cy.on("window:alert", stub);
      cy.get("button[class='btn btn-lg tab']").first().click();
      cy.get("input[type='text'][placeholder='First Name']").type("Ujang");
      cy.get("input[type='text'][placeholder='Last Name']").type("Kosasih");
      cy.get("input[type='text'][placeholder='Post Code']").type("40123");
      cy.get("button[class='btn btn-default']")
        .click()
        .then(() => {
          expect(stub).to.have.been.calledWithMatch(
            "Customer added successfully with customer id"
          );
        });
    });

    it("should success add account (rekening)", () => {
      const stub = cy.stub();
      cy.on("window:alert", stub);
      cy.get("button[class='btn btn-lg tab'][ng-class='btnClass2']").click();
      cy.get("select[name='userSelect']").select("Hermoine Granger");
      cy.get("select[name='currency']").select("Dollar");
      cy.get("button[type='submit']")
        .click()
        .then(() => {
          expect(stub).to.have.been.calledWithMatch(
            "Account created successfully with account Number"
          );
        });
    });

    it("should success read list customers", () => {
      cy.get("button[class='btn btn-lg tab']").last().click();
      cy.get("table")
        .should("have.length", 1)
        .find("tbody")
        .get("tr")
        .should("have.length.at.least", 1);
    });

    it("should success search / filter list customers", () => {
      cy.get("button[class='btn btn-lg tab']").last().click();
      cy.get("input[type='text']").type("granger");
      cy.get("table")
        .should("have.length", 1)
        .find("tbody")
        .get("tr")
        .should("have.length.at.least", 1);
    });

    it("should fail if no alert before delete customers", () => {
      const stub = cy.stub();
      cy.on("window:alert", stub);
      cy.get("button[class='btn btn-lg tab']").last().click();
      cy.get("input[type='text']").type("granger");
      cy.get("tbody")
        .find("button")
        .click()
        .then(() => {
          expect(stub).to.be.called;
        });
    });

    it("should fail if no button logout in navbar", () => {
      cy.get("div[class='box mainhdr']")
        .find("button")
        .should("have.length", 2)
        .last()
        .should("be.visible");
    });
  });
});
