/**
 * Heading Component
 *
 * Renders information about the transaction process.
 * On submitting an input what would the parsed transaction result look like.
 * 
 */
const fields = [
  "Version",
  "Transaction_id",
  "Amount",
  "Payment network",
  "Transaction descriptor",
  "Merchant",
  "Raw message",
];

export default function Heading() {
  return (
    <div className="mx-w-md w-full">
      <h1 className="text-2xl font-semibold text-gray-900">Transaction Details</h1>
      <p className="text-gray-700 mt-2">
        Enter a transaction number and receive the transaction details with the
        following values:{" "} <br></br>
        {fields.map((field, index) => (
          <span key={field} className="font-bold text-blue-600">
            {field}
            {index < fields.length - 2 ? ", " : ""}
            {index === fields.length - 2 ? ", and " : ""}
          </span>
        ))}
        .
      </p>
    </div>
  );
}
