import { Calendar, RefreshCcw, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { formatDistanceToNow, isPast } from "date-fns";
import { useState } from "react";

export default function LoanItem({ loan, onRenew }) {
  // Destructure with status included from your prisma query
  const { id, book, due_date, status } = loan;
  
  const dDate = new Date(due_date);
  
  
  const isOverdue = status === "OVERDUE" || isPast(dDate);

  const [isRenewing, setIsRenewing] = useState(false);

  const handleRenewClick = async () => {
    if (isRenewing) return;
    setIsRenewing(true);
    await onRenew(id);
    setIsRenewing(false);
  };

  return (
    <div className={`bg-secondary-bg border rounded-2xl p-4 lg:p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-300 ${
      isOverdue ? "border-red-500/30 hover:border-red-500" : "border-border-subtle hover:border-brand-text/30"
    }`}>
      
      {/* Book Cover */}
      <div className="w-16 h-20 lg:w-20 lg:h-24 bg-input-bg rounded-lg shrink-0 overflow-hidden shadow-sm border border-border-subtle">
        <img 
          src={book.cover_image_url} 
          alt={book.title} 
          className="w-full h-full object-cover" 
          onError={(e) => { e.target.src = 'https://placehold.co/400x600?text=No+Cover'; }}
        />
      </div>

      {/* Info Area */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-primary-text truncate pr-4 text-lg leading-tight">
            {book.title}
          </h3>
          
          {/* Status Badge */}
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border flex items-center gap-1 ${
            isOverdue 
              ? "bg-red-500/10 border-red-500/20 text-red-600" 
              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-600"
          }`}>
            {isOverdue ? <AlertCircle size={10} /> : <CheckCircle2 size={10} />}
            {isOverdue ? "Overdue" : "Active"}
          </span>
        </div>
        
        <p className="text-sm text-secondary-text mb-3 italic">
          by {book.author.first_name} {book.author.last_name}
        </p>
        
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs lg:text-sm">
          <div className="flex items-center gap-1.5 text-muted-text">
            <Calendar size={14} className="text-brand-text" />
            <span>Due {dDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          
          <div className={`flex items-center gap-1.5 font-semibold ${isOverdue ? "text-red-600 animate-pulse" : "text-brand-text"}`}>
            <AlertCircle size={14} />
            <span>
              {isOverdue ? "Late by " : "Due in "} 
              {formatDistanceToNow(dDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex sm:flex-col lg:flex-row gap-2 shrink-0 pt-2 sm:pt-0">
        <button 
          onClick={handleRenewClick}
          disabled={isOverdue || isRenewing}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-secondary-bg border border-border-subtle text-primary-text rounded-xl text-sm font-bold hover:bg-hover-light-bg hover:border-brand-text/50 disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
        >
          {isRenewing ? (
            <Loader2 size={16} className="animate-spin text-brand-text" />
          ) : (
            <RefreshCcw size={16} className={`${isRenewing ? 'animate-spin' : ''}`} />
          )}
          <span>{isRenewing ? "Renewing..." : "Extend Loan"}</span>
        </button>
      </div>
    </div>
  );
}