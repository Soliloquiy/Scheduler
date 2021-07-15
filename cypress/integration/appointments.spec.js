describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    // Visits the root of our web server
    cy.visit("/");
    //Assert if page is rendered with correct data
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]").first().click();
    // Enters their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    // Clicks the save button
    cy.contains("Save").click();
    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an appointment", () => {
    // Clicks the edit button for the existing appointment
    cy.get("[data-testid=appointment]")
      .get("[alt=Edit]")
      .click({ force: true })
      // Changes the name and interviewer
      .get("[data-testid=student-name-input]")
      .clear()
      .type("Adam Eve")
      .get("[alt='Tori Malcolm']")
      .click();
    // Clicks the save button
    cy.contains("Save").click();
    // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Adam Eve");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // Clicks the delete button for the existing appointment
    cy.get("[data-testid=appointment]")
      .get("[alt=Delete]")
      .click({ force: true });
    // Clicks the confirm button
    cy.contains("Confirm").click();
    // Check for "Deleting"
    cy.contains("Deleting").should("exist");
    // Check for end of delete request
    cy.contains("Deleting").should("not.exist");
    // Sees that the appointment slot is empty
    cy.get(".appointment__add").first().should("exist");
  });
});
