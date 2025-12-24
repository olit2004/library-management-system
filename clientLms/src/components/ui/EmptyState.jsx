import React from "react";
import {Inbox} from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center py-20 bg-secondary-bg rounded-3xl border border-dashed border-border-subtle">
      <Inbox className="mx-auto text-muted-text mb-4" size={48} />
      <h3 className="text-lg font-bold text-primary-text">
        No active reservations
      </h3>
      <p className="text-secondary-text text-sm">
        All requests are currently fulfilled or cancelled.
      </p>
    </div>
  );
}