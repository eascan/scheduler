import React from "react";
import axios from "axios";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  getByNameText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const {getByText} = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const {container, debug} = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // await waitForElement(() => getByText(container, "Monday"));

    // const appointment = getAllByTestId(container, "appointment")[0];
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"},
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // debug();

    // confirm that the student's name is showing after "saving" disappears
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const {container, debug} = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    // Another version:
    // const appointment = getAllByTestId(container, "appointment").find(
    //   appointment => queryByText(appointment, "Archie Cohen")
    // );
    const appointment = appointments[1];
    // 3. Click the  alt="Delete" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
    // 5. CLicks the Confirm button on the confirmation
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the text alt="Add" is displayed
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spot remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    // debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const {container, debug} = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    // 3. Click the "Edit"" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Edit"));
    // 4. Check that Archie Cohen name is shown.
    // 5. Change name to "Jack Smith".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Jack Smith"},
    });
    // 6. Click button Save
    fireEvent.click(getByText(appointment, "Save"));
    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 7. Wait until the element with the student name "Jack Smith" is displayed.
    await waitForElement(() => queryByText(appointment, "Jack Smith"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

    // debug();
  });
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    // 1. Render the Application.
    const {container, debug} = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    // 3. Click the "Edit"" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 5. Change name to "Jack Smith".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Jack Smith"},
    });
    // 6. Click button Save
    fireEvent.click(getByText(appointment, "Save"));
    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Wait until the saving error element pops up
    await waitForElement(() =>
      queryByText(appointment, "There was en error when saving")
    );
    // close the error component
    fireEvent.click(getByAltText(appointment, "Close"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

    // debug();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const {container, debug} = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    // 3. Click the "Delete"" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 5. Expects to see the confirm delete element.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
    // 5. CLicks the Confirm button on the confirmation
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until error message pops up
    await waitForElement(() =>
      queryByText(appointment, "There was en error when deleting")
    );

    fireEvent.click(getByAltText(appointment, "Close"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
});
