import React, { useEffect, useMemo, useRef } from "react";
import { useLoans } from "../../hooks/useLoans";
import { useReservations } from "../../hooks/useReservation";
import { useBooks } from "../../hooks/useBook";
import StatCard from "../../components/ui/StatCard";
import ActivityItem from "../../components/ui/ActivityItem";
import { BookOpen, AlertCircle, Clock, CheckCircle, TrendingUp, ChevronRight } from "lucide-react";

// Helper Component for Actions
const QuickActionButton = ({ label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center justify-between w-full p-4 bg-white/10 hover:bg-white/20 transition-colors rounded-2xl group text-left"
  >
    <span className="font-semibold">{label}</span>
    <ChevronRight size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
  </button>
);

export default function LibrarianOverview() {
  const { fetchAllLoans, fetchOverdue, items: loans, overdue } = useLoans();
  const { fetchAllReservations, reservations } = useReservations();
  const { totalCount, fetchTotalCount } = useBooks();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchAllLoans();
      fetchOverdue();
      fetchAllReservations();
      fetchTotalCount();
      hasFetched.current = true;
    }
  }, [fetchAllLoans, fetchOverdue, fetchAllReservations, fetchTotalCount]);

  const stats = useMemo(() => ({
      active: loans?.length || 0,
      overdue: overdue?.length || 0,
      waiting: reservations?.length || 0,
      totalBooks: totalCount,
  }), [loans, overdue, reservations, totalCount]);

const recentActivity = useMemo(() => {
  
  console.log("the loans are ",loans)
  if (!loans || loans.length === 0) return [];

 
  return [...loans]
    .filter(loan => loan.created_at) // Ensure there is a date to sort by
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);
}, [loans]);

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto">
      <header className="mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-black text-primary-text">Staff Portal</h1>
        <div className="flex items-center gap-2 bg-accent-light text-brand-text px-4 py-2 rounded-full">
          <TrendingUp size={16} /> <span className="text-sm font-bold">System Healthy</span>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard icon={<BookOpen className="text-blue-500" />} label="Active Loans" value={stats.active} />
        <StatCard icon={<AlertCircle className="text-red-500" />} label="Overdue" value={stats.overdue} trend="High Priority" urgent />
        <StatCard icon={<Clock className="text-amber-500" />} label="Waiting" value={stats.waiting} />
        <StatCard icon={<CheckCircle className="text-emerald-500" />} label="Inventory" value={stats.totalBooks} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Middle Column: Recent Activity */}
        <div className="lg:col-span-2 bg-secondary-bg rounded-3xl p-8 border border-border-subtle">
          <h3 className="text-lg font-bold mb-6 text-primary-text">Recent Circulation</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <ActivityItem 
                key={activity.id} 
                user={`${activity.user.first_name} ${activity.user.last_name}`} 
                book={activity.book.title} 
                action={activity.status === "RETURNED" ? "Returned" : "Borrowed"}
                time={new Date(activity.created_at).toLocaleDateString()}
              />
            ))}
          </div>
        </div>

       
        <div className="bg-accent-base rounded-3xl p-6 md:p-8 text-on-accent-text shadow-xl shadow-accent-base/20 h-fit">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="flex flex-col gap-3">
             <QuickActionButton label="Process a Return" />
             <QuickActionButton label="Manual Override" />
             <QuickActionButton label="Add New Title" />
             <QuickActionButton label="Export Reports" />
          </div>
        </div>
      </div>
    </div>
  );
}