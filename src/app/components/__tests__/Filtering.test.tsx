import { render, screen, fireEvent } from "@testing-library/react";
import { Filtering } from "../Filtering";

describe("Filtering", () => {
  it("renders the dropdown with the correct initial value", () => {
    const mockSetFilter = jest.fn();
    const initialFilter = "All";

    render(<Filtering filter={initialFilter} setFilter={mockSetFilter} />);

    const option = screen.getByRole("option", {
      name: initialFilter,
    }) as HTMLOptionElement;

    expect(option.selected).toBe(true);
  });

  it("calls setFilter when the filter changes", () => {
    const mockSetFilter = jest.fn();
    const initialFilter = "All";

    render(<Filtering filter={initialFilter} setFilter={mockSetFilter} />);

    const select = screen.getByTestId("filtering-select");

    fireEvent.change(select, { target: { value: "Completed" } });

    expect(mockSetFilter).toHaveBeenCalledTimes(1);
    expect(mockSetFilter).toHaveBeenCalledWith("Completed");
  });
});
