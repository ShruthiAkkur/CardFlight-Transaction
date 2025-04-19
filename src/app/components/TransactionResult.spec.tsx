import { ParsedTransaction } from "../types";
import TransactionResult from "./TransactionResult";
import { render, screen, } from "@testing-library/react";


const mockParsedTransaction:ParsedTransaction = {
  result:{
    version: "0.1",
    transaction_id: "abc-123",
    amount: "2200",
    paymentNetwork: "VISA",
    transaction_descriptor: "00002200",
    merchant: "WALMART",
    raw_message: "104VISA20564.80310WALMART",
},
status: 200        
};

describe('Transaction result',() =>{
  it('displays the received parsed transaction response',()=> {
    render(<TransactionResult parsedTransaction={mockParsedTransaction} />);
    expect(screen.getByTestId("network")).toHaveTextContent(mockParsedTransaction.result.paymentNetwork);
      expect(screen.getByTestId("merchant")).toHaveTextContent(mockParsedTransaction.result.merchant);
  })
})