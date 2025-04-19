"use client";
/**
 * TransactionForm Component
 *
 * Renders an input field and submit button for users to enter a transaction string.
 * On submission, sends the input to the API endpoint for processing.
 * Displays the parsed transaction result or any returned error.
 *
 * This component handles user interaction and API integration for transaction processing.
 */
import { ParsedTransaction } from "../types";
import { useEffect, useState} from "react";
import TransactionResult from "./TransactionResult"; 

export default function TransactionForm() {
  const [transactionNumber, setTransactionNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<ParsedTransaction|null>(null);
  const [error, setError] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTransactionDetails(null);

    try {
      const res = await fetch(`/api/processTransaction`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({transaction: transactionNumber})
      });

      if (!res.ok) {
        const errorMessage = await res.json();
        throw new Error(errorMessage.error || 'Failed to process this transaction');
      }
      const result = await res.json();
      setTransactionDetails(result);
      sessionStorage.setItem('lastTransaction',JSON.stringify(result))
    } catch (err: unknown) {
      setError(((err as Error).message) || 'An unknown error occured')
    }finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col dark:text-black max-w-sm">
        <input
          type="text"
          value={transactionNumber}
          onChange={(e) => setTransactionNumber(e.target.value)}
          placeholder="Enter transaction number"
          className="h-14 px-4 mb-4 rounded-lg borderBlack border-2 transition-all"
        />
        <button
          type="submit"
          className="group flex gap-2 items-center h-[3rem] w-[8rem] bg-gray-800 text-white rounded-full justify-center outline-none transition focus:scale-110 hover:scale-110 active:scale-105 hover:bg-gray-950 disabled:scale-100 disabled:bg-opacity-60"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {error && <p  data-testid="error-message" className="text-red-600 mt-4">Error: {error}</p>}
      {transactionDetails && <TransactionResult parsedTransaction={transactionDetails} />}
    </div>
  );
}


