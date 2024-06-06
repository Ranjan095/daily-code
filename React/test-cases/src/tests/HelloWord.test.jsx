import { fireEvent, render, screen } from "@testing-library/react";
import HelloWorld from "../components/HelloWorld";

import "@testing-library/jest-dom";
import { act } from "react";

describe("hello world component test-cases", () => {
  test("renders learn react link", () => {
    render(<HelloWorld />);
    const componentText = screen.getByText("HelloWorld");
    expect(componentText).toBeInTheDocument();
  });

  test("check textArea is available or not", async () => {
    await act(async () => render(<HelloWorld />));
    const texArea = screen.getByRole("textbox");
    expect(texArea).toBeInTheDocument();
  });

  test("State should be increase", () => {
    render(<HelloWorld />);
    const increaseButton = screen.getByRole("button");
    fireEvent.click(increaseButton);
    let showState = screen.getByTestId("inc-state");
    expect(showState).toHaveTextContent(1);
  });
});
