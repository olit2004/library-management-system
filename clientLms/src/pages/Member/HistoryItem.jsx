import { CalendarCheck, RotateCcw, ChevronRight } from "lucide-react";
import Button from "../../components/ui/Button";

export default function HistoryItem({ record, onReborrow }) {
  const { book, returnDate, borrowDate } = record;

  return (
    <div className="group bg-secondary-bg border border-border-subtle rounded-2xl p-4 flex items-center gap-4 hover:border-accent-base/30 transition-all duration-300">
      
      {/* Greyscale Book Thumbnail - Dark mode aware bg */}
      <div className="w-14 h-20 bg-input-bg rounded-lg overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">
        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-primary-text truncate text-sm lg:text-base">{book.title}</h3>
        <p className="text-xs text-secondary-text mb-2">{book.author}</p>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-text">
            <span>Borrowed: {new Date(borrowDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-secondary-text">
            {/* Kept green-500 for the checkmark as it works in both modes */}
            <CalendarCheck size={12} className="text-emerald-500" />
            <span>Returned: {new Date(returnDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="hidden sm:block">
        <Button 
         
          onClick={() => onReborrow(book.id)}
          title="Borrow again"
        >
          <RotateCcw size={16} />
        </Button>
      </div>
      
      <ChevronRight size={18} className="text-muted-text sm:hidden" />
    </div>
  );
}