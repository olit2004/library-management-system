import { useState } from "react";
import { BookOpen } from "lucide-react";
import { addDays } from "date-fns";
import LoanItem from "./LoanItem";

const INITIAL_LOANS = [
  {
    id: 1,
    dueDate: "2025-12-15T10:00:00Z", 
    book: {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200",
    },
  },
  {
    id: 2,
    dueDate: "2025-12-30T10:00:00Z",
    book: {
      title: "Atomic Habits",
      author: "James Clear",
      coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=200",
    },
  }
];

export default function MyLoans() {
  const [loans, setLoans] = useState(INITIAL_LOANS);

  const handleRenew = (loanId) => {
    const updatedLoans = loans.map((loan) => {
      if (loan.id === loanId) {
        return {
          ...loan,
          dueDate: addDays(new Date(loan.dueDate), 14).toISOString(),
        };
      }
      return loan;
    });
    setLoans(updatedLoans);
  };

  return (
    <div className="max-w-4xl mx-auto transition-colors">
      <header className="mb-8">
        {/* Use primary-text */}
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-text">My Active Loans</h1>
        {/* Use secondary-text */}
        <p className="text-sm text-secondary-text mt-1">
          You currently have {loans.length} books borrowed.
        </p>
      </header>

      {loans.length > 0 ? (
        <div className="space-y-4">
          {loans.map((loan) => (
            <LoanItem key={loan.id} loan={loan} onRenew={handleRenew} />
          ))}
        </div>
      ) : (
        /* Empty State uses secondary-bg and border-subtle */
        <div className="text-center py-20 bg-secondary-bg rounded-3xl border border-dashed border-border-subtle transition-colors">
          <BookOpen className="text-muted-text mx-auto mb-4" size={48} />
          <h2 className="text-lg font-semibold text-primary-text">No active loans</h2>
          <p className="text-secondary-text text-sm">Time to discover your next great read!</p>
        </div>
      )}
    </div>
  );
}