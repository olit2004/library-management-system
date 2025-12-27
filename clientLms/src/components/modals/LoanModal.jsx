import React, { useState } from "react";
import { X, UserPlus, CheckCircle2, User, Book as BookIcon, Loader2, AlertCircle } from "lucide-react";
import { useLoans } from "../../hooks/useLoans";
import Input from "../ui/Input"; 
import toast from "react-hot-toast";

export default function LoanModal({ isOpen, onClose, onLoanSuccess }) {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [localError, setLocalError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Using borrowBook from your hook
  const { createLoan, loading: isSubmitting ,error} = useLoans();

  const handleComplete = async (e) => {
    if (e) e.preventDefault();
    setLocalError("");

    if (!bookId || !userId) {
      setLocalError("Both Book ID and Member ID are required for a manual loan.");
      return;
    }
 
    // for librarian manual actions.
    const result = await createLoan({bookId:Number(bookId), userId:Number(userId)});


    if (result.success) {
      setIsSuccess(true);
      
      toast.success("Loan processed successfully", {
        style: {
          borderRadius: '12px',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-subtle)',
        },
      });

      setTimeout(() => {
        if (onLoanSuccess) onLoanSuccess();
        setBookId("");
        setUserId("");
        setIsSuccess(false);
        onClose();
      }, 600);
      
    } else {
      setLocalError(error);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      {/* Dark/White mode sensitive backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-md bg-secondary-bg md:rounded-3xl rounded-t-3xl border-t md:border border-border-subtle shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-border-subtle flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-light rounded-lg">
              <UserPlus size={20} className="text-accent-base" />
            </div>
            <h3 className="text-xl font-black text-primary-text">Manual Loan</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-hover-light-bg text-secondary-text rounded-full transition-colors"
          >
            <X size={20}/>
          </button>
        </div>

        <form onSubmit={handleComplete} className="p-8 space-y-6">
          <div className="space-y-4">
            <Input 
              name="userId"
              label="1. Scan Member ID"
              icon={User}
              placeholder="Enter User id e.g. 7721"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="bg-input-bg text-primary-text"
              disabled={isSubmitting || isSuccess}
            />

            <Input 
              name="bookId"
              label="2. Scan Book Barcode"
              icon={BookIcon}
              placeholder="Book ID e.g. 10293"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              className="bg-input-bg text-primary-text"
              disabled={isSubmitting || isSuccess}
            />
          </div>

          {localError && (
            <div className="flex items-center gap-3 text-red-text bg-red-hover-bg p-4 rounded-2xl text-sm border border-red-text/10 animate-shake">
              <AlertCircle size={20} className="shrink-0" />
              <p className="font-bold">{localError}</p>
            </div>
          )}

          <div className="pt-2">
            <button 
              type="submit"
              disabled={isSubmitting || isSuccess || !bookId || !userId}
              className={`w-full font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg 
                ${isSuccess 
                  ? "bg-green-500 text-white" 
                  : "bg-accent-base text-on-accent-text hover:opacity-90 active:scale-[0.98] shadow-accent-base/20"
                } disabled:opacity-30`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating Loan...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 size={20} />
                  Loan Created!
                </>
              ) : (
                "Complete Borrowing"
              )}
            </button>
            <p className="text-center text-[10px] text-muted-text mt-4 font-black uppercase tracking-widest">
              Librarian Override • Standard Policy
            </p>
          </div>
        </form>
        
        {/* Mobile drag indicator */}
        <div className="h-1.5 w-12 bg-border-subtle rounded-full mx-auto mb-4 md:hidden" />
      </div>
    </div>
  );
}