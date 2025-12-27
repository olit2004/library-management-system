import React, { useEffect, useState } from "react";
import ReservationRow from "./ReservationRow";
import EmptyState from "../../components/ui/EmptyState";
import { useReservations } from "../../hooks/useReservation"; 
import { CalendarCheck, Search, Loader2, RefreshCcw } from "lucide-react";
import { toast } from "react-hot-toast";

export default function LibrarianReservations() {
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchAllReservations, reservations, loading, fulfillReservation, cancelAny } = useReservations();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetchAllReservations();
    if (!res.success) {
      toast.error(res.error);
    }
  };

  const handleFulfill = async (id) => {
    const res = await fulfillReservation(id);
    if (res.success) {
      toast.success("Reservation marked as READY");
      loadData(); // Refresh list to update status
    } else {
      toast.error(res.error);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      const res = await cancelAny(id);
      if (res.success) {
        toast.success("Reservation removed");
        loadData(); // Refresh list to remove cancelled item
      } else {
        toast.error(res.error);
      }
    }
  };

  // Improved Filtering: Exclude CANCELLED and match search
  const filtered = (reservations || []).filter((r) => {
    const isNotCancelled = r.status !== "CANCELLED";
    const bookTitle = r.book?.title?.toLowerCase() || "";
    const userName = `${r.user?.first_name || ""} ${r.user?.last_name || ""}`.toLowerCase();
    const matchesSearch = bookTitle.includes(searchTerm.toLowerCase()) || 
                          userName.includes(searchTerm.toLowerCase());

    return isNotCancelled && matchesSearch;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary-text tracking-tight flex items-center gap-3">
            <CalendarCheck className="text-brand-text" />
            Reservation Queue
          </h1>
          <p className="text-secondary-text mt-1">
            Manage book requests and notify members for pickup.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={loadData}
            disabled={loading}
            className="p-3 bg-secondary-bg border border-border-subtle rounded-2xl text-secondary-text hover:text-brand-text transition-colors disabled:opacity-50"
          >
            <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
          </button>

          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" size={18} />
            <input
              type="text"
              placeholder="Search by book or member..."
              className="w-full bg-secondary-bg border border-border-subtle rounded-2xl pl-10 pr-4 py-3 text-sm text-primary-text focus:ring-2 ring-accent-base outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {loading && reservations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-brand-text mb-4" size={40} />
          <p className="text-secondary-text font-bold">Loading queue...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((res) => (
            <ReservationRow 
              key={res.id} 
              res={res} 
              onFulfill={() => handleFulfill(res.id)}
              onCancel={() => handleCancel(res.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          title={searchTerm ? "No matches found" : "Queue is empty"}
          message={searchTerm ? "Try searching for a different title or member." : "No active reservations at the moment."}
        />
      )}
    </div>
  );
}