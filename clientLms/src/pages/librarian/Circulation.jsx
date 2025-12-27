// pages/librarian/Circulation.jsx
import React, { useState, useEffect, useMemo } from "react";
import LoanStatusBadge from "../../components/ui/LoanStatusBadge";
import CirculationAction from "../../components/ui/CirculationAction";
import ReturnModal from "../../components/modals/ReturnModal";
import LoanModal from "../../components/modals/LoanModal";
import { useLoans } from "../../hooks/useLoans";

import {
  RotateCcw,
  UserPlus,
  Search,
  MoreVertical,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Circulation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModal, setActiveModal] = useState(null);

  const {
    items: activeLoans,
    loading,
    fetchAllLoans,
    error,
  } = useLoans();

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    fetchAllLoans();
  }, [fetchAllLoans]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  /* ---------------- FILTER ---------------- */
  const filteredLoans = useMemo(() => {
    const query = searchTerm.toLowerCase();

    return activeLoans.filter((loan) => {
      const userName = `${loan.user?.first_name ?? ""} ${loan.user?.last_name ?? ""}`.toLowerCase();
      const bookTitle = loan.book?.title?.toLowerCase() ?? "";

      return userName.includes(query) || bookTitle.includes(query);
    });
  }, [activeLoans, searchTerm]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-primary-text tracking-tight">
          Circulation Desk
        </h1>
        <p className="text-secondary-text mt-1">
          Manage physical book movements and policy overrides.
        </p>
      </header>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <CirculationAction
          icon={<RotateCcw className="text-blue-500" />}
          title="Process Return"
          desc="Scan book to check back in"
          onClick={() => setActiveModal("return")}
        />
        <CirculationAction
          icon={<UserPlus className="text-brand-text" />}
          title="Manual Loan"
          desc="Borrow for a member"
          onClick={() => setActiveModal("loan")}
        />
      </div>

      {/* Modals */}
      <ReturnModal
        isOpen={activeModal === "return"}
        onClose={() => setActiveModal(null)}
        onReturnSuccess={fetchAllLoans}
      />

      <LoanModal
        isOpen={activeModal === "loan"}
        onClose={() => setActiveModal(null)}
        onLoanSuccess={fetchAllLoans}
      />

      {/* Table */}
      <div className="bg-secondary-bg border border-border-subtle rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border-subtle flex flex-col md:flex-row justify-between gap-4">
          <h2 className="font-bold text-lg text-primary-text">
            Live Circulation List
          </h2>

          <div className="relative w-full md:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text"
              size={18}
            />
            <input
              type="text"
              placeholder="Search user or book..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-input-bg rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 ring-accent-base"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-input-bg/50 text-secondary-text text-[10px] uppercase tracking-widest font-black">
              <tr>
                <th className="px-6 py-4">Borrower</th>
                <th className="px-6 py-4">Book Title</th>
                <th className="px-6 py-4">Borrowed On</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border-subtle">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-accent-base" />
                  </td>
                </tr>
              ) : filteredLoans.length > 0 ? (
                filteredLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-input-bg/30">
                    {/* Borrower */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center text-xs font-bold uppercase">
                          {loan.user.first_name?.[0]}
                        </div>
                        <span className="font-bold text-sm">
                          {loan.user.first_name} {loan.user.last_name}
                        </span>
                      </div>
                    </td>

                    {/* Book */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium truncate max-w-[200px]">
                        {loan.book.title}
                      </p>
                    </td>

                    {/* Borrowed On */}
                    <td className="px-6 py-4 text-xs text-secondary-text">
                      {new Date(loan.checkout_date).toLocaleDateString()}
                    </td>

                    {/* Due */}
                    <td className="px-6 py-4 text-xs font-bold">
                      {new Date(loan.due_date).toLocaleDateString()}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <LoanStatusBadge
                        dueDate={loan.due_date}
                        status={loan.status}
                      />
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-input-bg rounded-lg">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center opacity-40">
                    <Search size={40} className="mx-auto mb-2" />
                    <p className="font-bold">
                      {searchTerm
                        ? "No matches found"
                        : "No active loans found"}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
