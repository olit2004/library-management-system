import React from "react";
import { Clock, CheckCircle, ArrowRight, XCircle } from "lucide-react";

export default function ReservationRow({ res, onFulfill, onCancel }) {
  // Define states based on status
  const isPending = res.status === "PENDING";
  const isReady = res.status === "READY";

  const userName = `${res.user?.first_name || ""} ${res.user?.last_name || ""}`.trim();
  const userInitial = userName.charAt(0) || "?";
  console.log(res)
  return (
    <div className="bg-secondary-bg border border-border-subtle rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-all">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="w-12 h-16 bg-input-bg rounded-lg overflow-hidden shrink-0">
          {res.book?.cover_image_url ? (
            <img
              src={res.book.cover_image_url}
              alt={res.book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-muted-text">
              No Image
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-primary-text truncate text-base">
            {res.book?.title}
          </h3>

          <div className="flex items-center gap-2 mt-1">
            <div className="w-5 h-5 rounded-full bg-accent-light flex items-center justify-center text-[10px] font-bold text-brand-text">
              {userInitial}
            </div>
            <p className="text-sm text-secondary-text">
              Requested by <span className="text-primary-text font-semibold">{userName}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 md:gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
        <div className="flex flex-col items-end shrink-0">
          {isReady ? (
            <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-xs uppercase tracking-wider">
              <CheckCircle size={14} />
              Ready for Pickup
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs uppercase tracking-wider">
              <Clock size={14} />
              In Queue (Pos: {res.position_in_queue
})
            </div>
          )}
          <p className="text-[10px] text-muted-text mt-1">
            ID: #{String(res.id).slice(0, 8)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Only show Fulfill button if it's PENDING */}
          {isPending && (
            <button 
              className="flex items-center gap-2 bg-accent-base text-on-accent-text px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-accent-base/90 active:scale-95 transition-all shadow-lg shadow-accent-base/20"
              onClick={onFulfill}
            >
              Fulfill Request
              <ArrowRight size={16} />
            </button>
          )}
          
         
          <button 
            className="p-2.5 text-muted-text hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            onClick={onCancel}
            title="Cancel Reservation"
          >
            <XCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}