import React from "react";
export default function QuickActionButton({ label }) {
  return (
    <button className="w-full py-3.5 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-left font-bold text-sm transition-all border border-white/5 active:scale-95">
      {label}
    </button>
  );
}