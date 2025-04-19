import { parseTransaction } from "./parseTransaction";

interface transactionPayload {
  transaction: string;
}

export const handleTransaction = async (body: transactionPayload) => {
  try {
    const result = parseTransaction(body.transaction);
    return {
      status: 200,
      result,
    };
  } catch (err) {
    const message = (err as Error).message;
    const status = message.includes('Missing') || message.includes('Malformed') ? 400 : 500;
    return {
      status,
      result: { error: 'Server error: ' + message },
    };
  }
};