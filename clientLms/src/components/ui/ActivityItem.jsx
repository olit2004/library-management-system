import React from "react";

export default function ActivityItem({ user, action, book, time, isOverdue }) {

  const initials = user
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center justify-between p-4 bg-primary-bg rounded-2xl border border-border-subtle/50 hover:border-accent-base/30 transition-all group">
      <div className="flex gap-4 items-center overflow-hidden">
        {/* Avatar with Initials */}
        <div className="w-10 h-10 rounded-full bg-input-bg flex items-center justify-center text-xs font-black text-brand-text shrink-0 group-hover:bg-accent-base group-hover:text-white transition-colors border border-border-subtle">
          {initials || "?"}
        </div>
        
        <div className="overflow-hidden">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-primary-text truncate">{user}</p>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tight ${
              action === "Returned" 
                ? "bg-emerald-500/10 text-emerald-500" 
                : "bg-blue-500/10 text-blue-500"
            }`}>
              {action}
            </span>
          </div>
          <p className="text-xs text-secondary-text truncate mt-0.5 font-medium italic">
            "{book}"
          </p>
        </div>
      </div>
      
      <div className="text-right shrink-0 ml-4">
        <span className="text-[10px] font-black text-muted-text uppercase block">
          {time}
        </span>
        {isOverdue && (
          <span className="text-[9px] text-red-text font-bold uppercase tracking-tighter">
            Overdue
          </span>
        )}
      </div>
    </div>
  );
}