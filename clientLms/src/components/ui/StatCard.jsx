import React from "react";
export default function StatCard({ icon, label, value, trend, urgent }) {
  return (
    <div className="bg-secondary-bg border border-border-subtle p-6 rounded-3xl transition-all hover:shadow-lg hover:translate-y-[-4px]">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-primary-bg rounded-2xl border border-border-subtle shadow-sm">{icon}</div>
{trend && (
          <span className={`text-[10px] uppercase tracking-widest font-black px-2 py-1 rounded-md ${
            urgent ? 'bg-red-hover-bg text-red-text' : 'bg-accent-light text-brand-text'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-secondary-text text-sm font-semibold">{label}</p>
      <h2 className="text-3xl font-black text-primary-text mt-1">{value}</h2>
    </div>
  );
}