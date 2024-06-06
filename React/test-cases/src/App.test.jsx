import { render, screen } from "@testing-library/react";
import HelloWorld from "./components/HelloWorld";

import "@testing-library/jest-dom";

test("renders learn react link", async () => {
  render(<HelloWorld />);
  const componentText = screen.getByText("HelloWorld");
  expect(componentText).toBeInTheDocument();
});
