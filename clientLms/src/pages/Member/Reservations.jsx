import { useState, useEffect } from "react";
import ReservationItem from "./ReservationItem";
import { Bookmark, CheckCircle2, Loader2 } from "lucide-react";
import { useReservations } from "../../hooks/useReservation"
import { toast } from "react-hot-toast";

export default function Reservations() {
  const { fetchMyReservations, cancelMyReservation, loading } = useReservations();
  const [reservations, setReservations] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load reservations on mount
  useEffect(() => {
    const loadData = async () => {
      const res = await fetchMyReservations();
      if (res.success) {
        setReservations(res.data.data);
      } else {
        toast.error("Could not load reservations");
      }
      setIsInitialLoad(false);
    };
    loadData();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      const res = await cancelMyReservation(id);
      
      if (res.success) {
        // Update local state by filtering out the cancelled item
        setReservations(prev => prev.filter(r => r.id !== id));
        toast.success("Reservation cancelled");
      } else {
        toast.error(res.error || "Failed to cancel");
      }
    }
  };
  console.log(" reservations are",reservations )

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-0 transition-colors">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary-text tracking-tight">
            My Reservations
          </h1>
          <p className="text-sm text-secondary-text mt-1">
            Track books you've requested and see your place in line.
          </p>
        </div>
        {/* Visual indicator for refreshing */}
        {!isInitialLoad && loading && <Loader2 className="animate-spin text-brand-text mb-2" size={20} />}
      </header>

      {isInitialLoad ? (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="h-24 bg-input-bg rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : reservations.length > 0 ? (
        <div className="space-y-4">
          {reservations.map(res => (
            <ReservationItem 
              key={res.id} 
              reservation={{
                id: res.id,
                status: res.status, 
                pickupBy: res.pickup_by, 
                queuePosition: res.queue_position, 
                book: {
                  title: res.book.title,
                  coverImage: res.book.cover_image_url
                }
              }} 
              onCancel={handleCancel} 
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-secondary-bg rounded-3xl border border-dashed border-border-subtle">
          <div className="w-16 h-16 bg-input-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="text-muted-text" size={32} />
          </div>
          <h2 className="text-lg font-semibold text-primary-text">No reservations</h2>
          <p className="text-secondary-text text-sm max-w-xs mx-auto mt-1">
            When a book is unavailable, reserve it to get notified when it returns.
          </p>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-10 p-5 bg-accent-light rounded-2xl flex items-start gap-4 border border-brand-text/10">
        <div className="p-2 bg-secondary-bg rounded-lg shadow-sm">
          <CheckCircle2 className="text-brand-text" size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-brand-text">How it works</h4>
          <p className="text-xs text-secondary-text mt-1 leading-relaxed">
            You will receive an email as soon as a book is ready. Reserved items are held 
            for <span className="font-bold text-primary-text">3 business days</span>. 
          </p>
        </div>
      </div>
    </div>
  );
}