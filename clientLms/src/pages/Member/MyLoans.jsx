import React, { useEffect } from 'react';
import { BookOpen, Loader2 } from "lucide-react";
import LoanItem from "./LoanItem";
import { useLoans } from "../../hooks/useLoans";
import { toast } from 'react-hot-toast';

export default function MyLoans() {

  const { items: loans, loading, fetchActive, renewLoan } = useLoans();

 
useEffect(() => {
  fetchActive();
  console.log("loans are gjkanghklae",loans)
}, []);

  const handleRenew = async (loanId) => {
    const result = await renewLoan(loanId);
    
    if (result.success) {
      toast.success("Loan renewed successfully!");
     
      fetchActive();
    } else {
      toast.error(result.error || "Failed to renew loan");
    }
  };


  if (loading && loans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-accent-base animate-spin" />
        <p className="mt-4 text-secondary-text animate-pulse">Fetching your active loans...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto transition-colors">
      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-text">My Active Loans</h1>
        <p className="text-sm text-secondary-text mt-1">
          {loans.length > 0 
            ? `You currently have ${loans.length} books borrowed.` 
            : "You don't have any books checked out right now."}
        </p>
      </header>

      {loans.length > 0 ? (
        <div className="space-y-4">
          {loans.map((loan) => (
            <LoanItem 
              key={loan.id} 
              loan={loan} 
              onRenew={() => handleRenew(loan.id)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-secondary-bg rounded-3xl border border-dashed border-border-subtle transition-colors">
          <BookOpen className="text-muted-text mx-auto mb-4" size={48} />
          <h2 className="text-lg font-semibold text-primary-text">No active loans</h2>
          <p className="text-secondary-text text-sm">Time to discover your next great read!</p>
        </div>
      )}
    </div>
  );
}