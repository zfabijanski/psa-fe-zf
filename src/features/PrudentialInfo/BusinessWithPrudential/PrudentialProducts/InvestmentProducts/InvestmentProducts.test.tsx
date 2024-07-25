import { render, addTestProviders, screen, fireEvent } from "testUtils";
import InvestmentProducts from "./InvestmentProducts";

describe("InvestmentProducts", () => {
  const originalError = console.error;

  afterEach(() => {
    console.error = originalError;
  });

  it("has the correct investment content text", () => {
    // mock console.error to prevent error from react children in redux's modal
    console.error = jest.fn();

    render(
      <InvestmentProducts title="prudentialProducts.mainContract.title" />,
      {
        wrapper: addTestProviders({ realIntlProvider: true }),
      }
    );

    fireEvent.click(screen.getByText(/Produkty inwestycyjne/i));

    expect(
      screen.getByText(/Składka od 50 tys. zł do 5 mln zł/i)
    ).toBeInTheDocument();
  });
});
