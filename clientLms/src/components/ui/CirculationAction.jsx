
import React from "react";
// Sub-components for better organization
export default function CirculationAction({ icon, title, desc, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-start gap-4 p-5 bg-secondary-bg border border-border-subtle rounded-2xl hover:border-accent-base/50 transition-all text-left group active:scale-95"
    >
      <div className="p-3 bg-primary-bg rounded-xl group-hover:bg-accent-light transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-primary-text text-sm">{title}</h3>
        <p className="text-xs text-secondary-text mt-0.5">{desc}</p>
      </div>
    </button>
  );
}