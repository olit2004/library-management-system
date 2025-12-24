import React, { useState, useEffect } from "react";
import { X, Scan, CheckCircle2, User, Book as BookIcon } from "lucide-react";
import Input from "../ui/Input"; // Importing your custom component

export default function ReturnModal({ isOpen, onClose, onReturnSuccess }) {
  const [bookId, setBookId] = useState("");
  const [activeLoan, setActiveLoan] = useState(null); 
  const [loading, setLoading] = useState(false);

  // Auto-lookup logic when bookId changes
  useEffect(() => {
    const lookupBook = async () => {
      if (bookId.trim().length >= 3) {
        setLoading(true);
        // This is where your API call would go
        // const response = await api.get(`/loans/active/${bookId}`);
        setTimeout(() => {
          setActiveLoan({
            userName: "Alex Johnson",
            userId: "USR-7721",
            bookTitle: "The Great Gatsby",
          });
          setLoading(false);
        }, 600);
      } else {
        setActiveLoan(null);
      }
    };

    const timer = setTimeout(lookupBook, 500); // Debounce
    return () => clearTimeout(timer);
  }, [bookId]);

  const handleComplete = () => {
    // Passes both IDs back to the parent as requested
    onReturnSuccess({
      bookId: bookId,
      userId: activeLoan?.userId
    });
    setBookId("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-secondary-bg md:rounded-3xl rounded-t-3xl border border-border-subtle shadow-2xl animate-in slide-in-from-bottom duration-300 overflow-hidden">
        <div className="p-6 border-b border-border-subtle flex justify-between items-center bg-white/50">
          <h3 className="text-xl font-black text-primary-text">Process Return</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/80 rounded-full transition-colors"><X size={20}/></button>
        </div>

        <div className="p-8 space-y-6">
          {/* Using your custom Input component */}
          <Input 
            name="bookId"
            label="Scan Book Barcode"
            icon={Scan}
            placeholder="e.g. BK-2024"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />

          {/* Verification Card */}
          <div className={`transition-all duration-300 ${activeLoan ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 h-0 overflow-hidden'}`}>
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-5 border border-white/50 space-y-3 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-500 tracking-wider">Current Borrower</p>
                  <p className="font-bold text-gray-900">{activeLoan?.userName}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-t border-gray-200/50 pt-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <BookIcon size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-500 tracking-wider">Book Title</p>
                  <p className="font-bold text-gray-900 line-clamp-1">{activeLoan?.bookTitle}</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            disabled={!activeLoan || loading}
            onClick={handleComplete}
            className="w-full bg-teal-500 text-white font-black py-4 rounded-2xl hover:bg-teal-600 transition-all disabled:opacity-20 flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
          >
            {loading ? "Searching..." : "Confirm Return"}
          </button>
        </div>
      </div>
    </div>
  );
}