import Heading from "./components/Heading";
import TransactionForm from "./components/TransactionForm";

export default function Main() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 ">
      <div className="max-w-3xl mx-auto space-y-6">
        <Heading />
        <TransactionForm />
      </div>
    </main>
  );
}
