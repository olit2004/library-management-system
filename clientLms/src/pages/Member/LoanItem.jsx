import { Calendar, RefreshCcw, AlertCircle } from "lucide-react";
import { formatDistanceToNow, isPast } from "date-fns";

export default function LoanItem({ loan, onRenew }) {
  const { id, book, dueDate } = loan;
  const dDate = new Date(dueDate);
  const isOverdue = isPast(dDate);

  return (
    <div className="bg-secondary-bg border border-border-subtle rounded-2xl p-4 lg:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-all duration-300">
      
      {/* Thumbnail Container */}
      <div className="w-16 h-20 lg:w-20 lg:h-24 bg-input-bg rounded-lg flex-shrink-0 overflow-hidden transition-colors">
        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
      </div>

      {/* Info Area */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-primary-text truncate pr-4">{book.title}</h3>
          
          {/* Status Badge */}
          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            isOverdue 
              ? "bg-red-50 dark:bg-red-950/40 text-red-600" 
              : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600"
          }`}>
            {isOverdue ? "Overdue" : "Active"}
          </span>
        </div>
        
        <p className="text-sm text-secondary-text mb-3">{book.author}</p>
        
        <div className="flex items-center gap-4 text-xs lg:text-sm">
          <div className="flex items-center gap-1.5 text-secondary-text">
            <Calendar size={14} />
            <span>Due {dDate.toLocaleDateString()}</span>
          </div>
          
          {/* Accent text: teal for active, red for overdue */}
          <div className={`flex items-center gap-1.5 font-medium ${isOverdue ? "text-red-600" : "text-brand-text"}`}>
            <AlertCircle size={14} />
            <span>
              {isOverdue ? "Late by " : "In "} 
              {formatDistanceToNow(dDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Button uses the new semantic variables */}
      <div className="flex sm:flex-col lg:flex-row gap-2">
        <button 
          onClick={() => onRenew(id)}
          disabled={isOverdue}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary-bg border border-border-subtle text-primary-text rounded-xl text-sm font-medium hover:bg-hover-light-bg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCcw size={14} />
          Renew
        </button>
      </div>
    </div>
  );
}