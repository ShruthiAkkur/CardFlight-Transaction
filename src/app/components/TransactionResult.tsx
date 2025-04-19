/**
 * TransactionResult Component
 *
 * Displays the parsed transaction details returned from the API.
 * Accepts a parsedTransaction object as a prop and renders its values.
 *
 * Used to present the response after a successful transaction submission.
 */
import { ParsedTransaction } from "../types";

type parsedTransactionProps = {
  parsedTransaction: ParsedTransaction
}

export default function TransactionResult({ parsedTransaction} : parsedTransactionProps) {
  return (
    <div className="mt-6 text-black rounded shadow p-4 space-y-2 text-sm">
      <h2 className="text-lg font-bold">Transaction Success!</h2>
      <div><strong>ID:</strong> {parsedTransaction.result.transaction_id}</div>
      <div><strong>Version:</strong> {parsedTransaction.result.version}</div>
      <div><strong>Amount (in cents):</strong> {parsedTransaction.result.amount}</div>
      <div data-testid="network"><strong>Payment Network:</strong> {parsedTransaction.result.paymentNetwork}</div>
      <div><strong>Transaction Descriptor:</strong> {parsedTransaction.result.transaction_descriptor}</div>
      <div data-testid="merchant"><strong>Merchant:</strong> {parsedTransaction.result.merchant}</div>
      <div><strong>Raw:</strong> {parsedTransaction.result.raw_message}</div>
    </div>
  );
}

// const TransactionResult = React.memo(({parsedTransaction}: parsedTransactionProps)=>{
//   return (
//     <div className="mt-6 text-black rounded shadow p-4 space-y-2 text-sm">
//       <h2 className="text-lg font-bold">Transaction Success!</h2>
//       <div><strong>ID:</strong> {parsedTransaction.result.transaction_id}</div>
//       <div><strong>Version:</strong> {parsedTransaction.result.version}</div>
//       <div><strong>Amount (in cents):</strong> {parsedTransaction.result.amount}</div>
//       <div data-testid="network"><strong>Payment Network:</strong> {parsedTransaction.result.paymentNetwork}</div>
//       <div><strong>Transaction Descriptor:</strong> {parsedTransaction.result.transaction_descriptor}</div>
//       <div data-testid="merchant"><strong>Merchant:</strong> {parsedTransaction.result.merchant}</div>
//       <div><strong>Raw:</strong> {parsedTransaction.result.raw_message}</div>
//     </div>
//   );
// });