import { MapPin, Clock, XCircle } from "lucide-react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

export default function ReservationItem({ reservation, onCancel }) {
  const { id, book, status, queuePosition, pickupBy } = reservation;
  const isReady = status === "READY";

  return (
    <div className="bg-secondary-bg border border-border-subtle rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:shadow-md">
      {/* Book Cover */}
      <div className="w-16 h-20 bg-input-bg rounded-lg overflow-hidden shrink-0 transition-colors">
        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
      </div>

      {/* Info Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-primary-text truncate">{book.title}</h3>
          {/* Ensure your Badge component also uses semantic variables or dark: logic */}
          <Badge variant={isReady ? "success" : "warning"}>
            {isReady ? "Ready for Pickup" : "In Queue"}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
          {isReady ? (
            <div className="flex items-center gap-1.5 text-xs font-medium text-brand-text">
              <MapPin size={14} />
              <span>Collect by {new Date(pickupBy).toLocaleDateString()}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-secondary-text">
              <Clock size={14} />
              <span>Position: #{queuePosition}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="w-full sm:w-auto">
        <Button 
          variant="danger" 
          className="w-full sm:w-auto text-xs px-4 py-2 bg-transparent border-none shadow-none text-red-text hover:bg-red-hover-bg transition-colors"
          onClick={() => onCancel(id)}
        >
          <XCircle size={14} className="mr-1.5" />
          Cancel Reservation
        </Button>
      </div>
    </div>
  );
}