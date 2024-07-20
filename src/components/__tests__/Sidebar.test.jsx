import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Sidebar Component", () => {
  test("renders with correct text", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText(/Click Me/i)).toBeInTheDocument();
  });

  test("applies className correctly", () => {
    render(<Button className="bg-blue-500">Click Me</Button>);
    expect(screen.getByText(/Click Me/i)).toHaveClass("bg-blue-500");
    expect(screen.getByText(/Click Me/i)).toHaveClass("px-4 py-2 text-white");
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText(/Click Me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("sets the button type correctly", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByText(/Submit/i)).toHaveAttribute("type", "submit");
  });
});
