import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TransactionForm from "./TransactionForm";
import '@testing-library/jest-dom';
import {ParsedTransaction} from "../types"


describe("TransactionForm", () => {
  const mockParsedTransaction: ParsedTransaction = {
    result:{
      version: "0.1",
      transaction_id: "abc-123",
      amount: "2200",
      paymentNetwork: "VISA",
      transaction_descriptor: "00002200",
      merchant: "WALMART",
      raw_message: "104VISA20564.80310WALMART",
    },
    status: 200,       
  };
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(mockParsedTransaction),
      })
    ) as jest.Mock;
  });
  
  afterEach(() => {
      jest.clearAllMocks()
  });

  it("renders transaction form page", () => {
    render(<TransactionForm />);
    expect(screen.getByPlaceholderText("Enter transaction number")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit"})).toBeInTheDocument();
  });

  it("updates input value", () => {
    render(<TransactionForm />);
    const input = screen.getByPlaceholderText("Enter transaction number");
    fireEvent.change(input, { target: { value: "104VISA20564.80310WALMART" } });
    expect(input).toHaveValue("104VISA20564.80310WALMART");
  });

  it("displays loading state and results after successful fetch", async () => {
    render(<TransactionForm />);
    const input = screen.getByPlaceholderText("Enter transaction number");
    const button = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(input, { target: { value: "104VISA20564.80310WALMART" } });
    fireEvent.click(button);

    expect(button).toHaveTextContent("Processing...");

    await waitFor(() => {
      expect(screen.getByTestId("network")).toHaveTextContent(mockParsedTransaction.result.paymentNetwork);
      expect(screen.getByTestId("merchant")).toHaveTextContent(mockParsedTransaction.result.merchant);
    });
  });

  it("shows error if fetch fails", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );

    render(<TransactionForm />);
    fireEvent.change(screen.getByPlaceholderText("Enter transaction number"), {
      target: { value: "309SRMR10820" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() =>
      expect(screen.getByTestId("error-message")).toHaveTextContent(/res\.json is not a function/i)
    );
  });
});
