import { render, screen } from "@testing-library/react";
import HelloWorld from "./components/HelloWorld";

test("renders learn react link", () => {
  render(<HelloWorld />);
  const componentText = screen.getByText("HelloWorld");
  expect(componentText).toBeInTheDocument();
});
