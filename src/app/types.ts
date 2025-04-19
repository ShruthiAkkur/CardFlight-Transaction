export type ParsedTransaction = {
  result: {
    version: string,
    transaction_id: string,
    amount: string,
    paymentNetwork: string,
    transaction_descriptor: string,
    merchant: string,
    raw_message: string
  }
  status: number;
};




