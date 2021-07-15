import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  getByDisplayValue,
} from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    //Make sure element has rendered properly
    await waitForElement(() => getByText("Monday"));
    //Click on Tuesday
    fireEvent.click(getByText("Tuesday"));
    //Check if "Leopold Silvers" is in document
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    //Make sure element has rendered properly
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //Get first appointment in list
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    //Click Add on empty appointment
    fireEvent.click(getByAltText(appointment, "Add"));
    //Change input
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    //Click Interviewer and save
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    //Check if saving status is present
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //Make sure page renders with proper data after saving status
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    //Select Monday in day list
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    //Check if spots has been updated
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    //Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    //Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you want to delete?")
    ).toBeInTheDocument();
    //Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    //Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    //Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    //Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, getByTestId } = render(<Application />);

    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    //Check if value after edit is the same student name
    expect(getByDisplayValue(appointment, "Archie Cohen"));

    //Change student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Yaweh" },
    });

    //Check that the student name "Yaweh" is shown on edit
    expect(getByTestId("student-name-input")).toHaveValue("Yaweh");

    //Click on interviewer
    fireEvent.click(queryByAltText(appointment, "Sylvia Palmer"));

    //Click the "Save" button on the confirmation.
    fireEvent.click(getByText(appointment, "Save"));
    //Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //Wait until the element with the edited name is displayed
    await waitForElement(() => getByText(appointment, "Yaweh"));
    //Check that the DayListItem with the text "Monday" still has text "1 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    //Create axios mock error for saving
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));
    //Check if appointment value is "Archie Cohen"
    expect(getByDisplayValue(appointment, "Archie Cohen"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Yaweh" },
    });

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, "There was an error saving your appointment")
    );

    expect(
      getByText(appointment, "There was an error saving your appointment")
    ).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    //Create axios mock error for deleting
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, "There was an error deleting your appointment")
    );

    expect(
      getByText(appointment, "There was an error deleting your appointment")
    ).toBeInTheDocument();
  });
});
