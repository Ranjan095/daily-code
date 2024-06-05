import { render, screen } from "@testing-library/react";
import HelloWorld from "../components/HelloWorld";


describe("hello worrld component test-cases", () => {
  test("renders learn react link", () => {
    render(<HelloWorld />);
    const componentText = screen.getByText("HelloWorld");
    expect(componentText).toBeInTheDocument();
  });

  test("check textArea is available or not", () => {
    render(<HelloWorld />);
    let texArea = screen.getByRole("textbox");
    expect(texArea).toBeInTheDocument();
  });
});
