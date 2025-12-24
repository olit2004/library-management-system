import React from "react";

import { 
   
  ShieldCheck, ShieldAlert
} from "lucide-react";

export default function StatusBadge({ status }) {
  const isActive = status === "Active";
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
      isActive 
      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
      : "bg-red-hover-bg text-red-text border-red-text/20"
    }`}>
      {isActive ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
      {status}
    </span>
  );
}