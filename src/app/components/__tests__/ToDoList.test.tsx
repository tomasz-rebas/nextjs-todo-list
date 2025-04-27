import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "../ToDoList";
import { ToDo } from "../../types";

const mockToDos: ToDo[] = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: false },
  { id: 5, title: "Task 5", completed: true },
];

describe("ToDoList", () => {
  it("filters displayed ToDos when changing the filter", () => {
    render(<ToDoList initialData={mockToDos} error={null} />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
    expect(screen.getByText("Task 4")).toBeInTheDocument();
    expect(screen.getByText("Task 5")).toBeInTheDocument();

    const select = screen.getByTestId("filtering-select");
    fireEvent.change(select, { target: { value: "Completed" } });

    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.queryByText("Task 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 4")).not.toBeInTheDocument();
    expect(screen.getByText("Task 5")).toBeInTheDocument();

    fireEvent.change(select, { target: { value: "Unfinished" } });

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
    expect(screen.getByText("Task 4")).toBeInTheDocument();
    expect(screen.queryByText("Task 5")).not.toBeInTheDocument();
  });

  it("shows error when fetch fails", () => {
    render(
      <ToDoList initialData={mockToDos} error="Failed to fetch the data." />
    );

    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 4")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 5")).not.toBeInTheDocument();

    expect(screen.getByText("Failed to fetch the data.")).toBeInTheDocument();
  });
});
