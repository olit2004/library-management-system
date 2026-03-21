import React from "react";

import { CheckCircle2 } from "lucide-react";


export default function LoanStatusBadge({ dueDate }) {
  const isOverdue = new Date(dueDate) < new Date();
  return (
    <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase px-2 py-1 rounded-md border ${
      isOverdue 
      ? 'bg-red-hover-bg text-red-text border-red-text/20' 
      : 'bg-accent-light text-brand-text border-brand-text/10'
    }`}>
      {isOverdue ? <AlertCircle size={12} /> : <CheckCircle2 size={12} />}
      {isOverdue ? 'Overdue' : 'On Time'}
    </span>
  );
}