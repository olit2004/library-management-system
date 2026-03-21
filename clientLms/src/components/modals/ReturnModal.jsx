import React, { useState } from "react";
import { X, Scan, CheckCircle2, User, Book as BookIcon, Loader2, AlertCircle } from "lucide-react";
import { useLoans } from "../../hooks/useLoans";
import Input from "../ui/Input"; 
 // 1. Import toast

export default function ReturnModal({ isOpen, onClose, onReturnSuccess }) {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [localError, setLocalError] = useState("");
  
  const { returnBook, loading: isSubmitting,error } = useLoans();

  const handleComplete = async (e) => {
    if (e) e.preventDefault();
    setLocalError("");

    if (!bookId || !userId) {
      setLocalError("Please scan both the Book and Member ID.");
      return;
    }

    const result = await returnBook(Number(userId), Number(bookId));

    if (result.success) {
      // 2. Trigger Success Toast

      // 3. Small delay for better UX before closing
      setTimeout(() => {
        if (onReturnSuccess) onReturnSuccess();
        setBookId("");
        setUserId("");
        onClose();
      }, 500);
      
    } else {
      setLocalError(error);
      // Optional: error toast as well
      
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-md bg-secondary-bg md:rounded-3xl rounded-t-3xl border-t md:border border-border-subtle shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        <div className="p-6 border-b border-border-subtle flex justify-between items-center">
          <h3 className="text-xl font-black text-primary-text">Process Return</h3>
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
              name="bookId"
              label="1. Scan Book Barcode"
              icon={BookIcon}
              placeholder="Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              className="bg-input-bg text-primary-text"
            />

            <Input 
              name="userId"
              label="2. Scan Member ID"
              icon={User}
              placeholder="Member ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="bg-input-bg text-primary-text"
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
              disabled={isSubmitting || !bookId || !userId}
              className="w-full bg-accent-base text-on-accent-text font-black py-4 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-30 flex items-center justify-center gap-2 shadow-lg shadow-accent-base/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  Confirm Return
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-muted-text mt-4 font-black uppercase tracking-widest">
              Librarian Dashboard • System v4
            </p>
          </div>
        </form>
        
        <div className="h-1.5 w-12 bg-border-subtle rounded-full mx-auto mb-4 md:hidden" />
      </div>
    </div>
  );
}