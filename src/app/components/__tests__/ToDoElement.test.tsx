import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToDoElement from "../ToDoElement";

describe("ToDoElement", () => {
  it("renders unfinished ToDo", () => {
    const toDo = { id: 1, title: "Test ToDo", completed: false };
    const setToDos = jest.fn();

    render(<ToDoElement toDo={toDo} setToDos={setToDos} />);

    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Test ToDo");

    expect(checkbox).not.toBeChecked();
    expect(label).toBeInTheDocument();
  });

  it("renders completed ToDo", () => {
    const toDo = { id: 2, title: "Second ToDo", completed: true };
    const setToDos = jest.fn();

    render(<ToDoElement toDo={toDo} setToDos={setToDos} />);

    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Second ToDo");

    expect(checkbox).toBeChecked();
    expect(label).toBeInTheDocument();
  });

  it("updates ToDo when toggling checkbox", async () => {
    const toDo = { id: 1, title: "Test todo", completed: false };
    const setToDos = jest.fn();

    render(<ToDoElement toDo={toDo} setToDos={setToDos} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);

    expect(setToDos).toHaveBeenCalledTimes(1);
    expect(setToDos).toHaveBeenCalledWith(expect.any(Function));

    const callback = setToDos.mock.calls[0][0];

    const updatedState = callback([toDo]);

    expect(updatedState).toEqual([{ ...toDo, completed: true }]);

    waitFor(() => {
      expect(screen.getByRole("checkbox")).toBeChecked();
    });
  });
});
