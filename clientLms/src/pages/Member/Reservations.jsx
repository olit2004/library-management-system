import { useState, useEffect } from "react";
import ReservationItem from "./ReservationItem";
import { Bookmark, CheckCircle2 } from "lucide-react";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch
    setTimeout(() => setLoading(false), 800);
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      setReservations(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-0 transition-colors">
      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-text tracking-tight">
          My Reservations
        </h1>
        <p className="text-sm text-secondary-text mt-1">
          Track books you've requested and see your place in line.
        </p>
      </header>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="h-24 bg-input-bg rounded-2xl animate-pulse transition-colors" />
          ))}
        </div>
      ) : reservations.length > 0 ? (
        <div className="space-y-4">
          {reservations.map(res => (
            <ReservationItem key={res.id} reservation={res} onCancel={handleCancel} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-secondary-bg rounded-3xl border border-dashed border-border-subtle transition-colors">
          <div className="w-16 h-16 bg-input-bg rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="text-muted-text" size={32} />
          </div>
          <h2 className="text-lg font-semibold text-primary-text">No reservations</h2>
          <p className="text-secondary-text text-sm max-w-xs mx-auto mt-1">
            When a book is unavailable, reserve it to get notified when it returns.
          </p>
        </div>
      )}

      {/* Info Section - Dark Mode Optimized */}
      <div className="mt-10 p-5 bg-accent-light rounded-2xl flex items-start gap-4 border border-brand-text/10 transition-colors">
        <div className="p-2 bg-secondary-bg rounded-lg shadow-sm">
          <CheckCircle2 className="text-brand-text" size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-brand-text">How it works</h4>
          <p className="text-xs text-secondary-text mt-1 leading-relaxed">
            You will receive an email as soon as a book is ready. Reserved items are held 
            at the front desk for <span className="font-bold text-primary-text">3 business days</span>. 
            If not collected, they move to the next person in line.
          </p>
        </div>
      </div>
    </div>
  );
}