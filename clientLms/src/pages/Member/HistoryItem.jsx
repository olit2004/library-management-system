import { CalendarCheck, RotateCcw, ChevronRight } from "lucide-react";
import Button from "../../components/ui/Button";

export default function HistoryItem({ record, onReborrow }) {
  // Mapping to real backend keys
  const { book, returned_date, checkout_date } = record;
 

  console.log(record)


  return (
    <div className="group bg-secondary-bg border border-border-subtle rounded-2xl p-4 flex items-center gap-4 hover:border-brand-text/30 transition-all duration-300">
      
      {/* Greyscale Book Thumbnail - Real URL */}
      <div className="w-14 h-20 bg-input-bg rounded-lg overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all shadow-sm">
        <img 
          src={book.cover_image_url} 
          alt={book.title} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-primary-text truncate text-sm lg:text-base">{book.title}</h3>
        <p className="text-xs text-secondary-text mb-2">
          by {book.author.first_name} {book.author.last_name}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-text">
            <span>Borrowed: {new Date(checkout_date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-brand-text">
            <CalendarCheck size={12} className="text-emerald-500" />
            <span>Returned: {new Date(returned_date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Action: Re-borrow */}
      <div className="hidden sm:block">
        <button 
          onClick={() => onReborrow(book.id)}
          className="p-2.5 rounded-xl bg-accent-light text-brand-text hover:bg-brand-text hover:text-white transition-all"
          title="Borrow again"
        >
          <RotateCcw size={16} />
        </button>
      </div>
      
      <ChevronRight size={18} className="text-muted-text sm:hidden" />
    </div>
  );
}