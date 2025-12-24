// pages/librarian/Circulation.jsx
import React, { useState, useEffect } from "react";
import  LoanStatusBadge from "../../components/ui/LoanStatusBadge"
import CirculationAction from "../../components/ui/CirculationAction";
import ReturnModal from "../../components/modals/ReturnModal";
import { 
  RotateCcw, ShieldAlert, UserPlus, Search, 
  MoreVertical, CheckCircle2, AlertCircle 
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Circulation() {
  const [activeLoans, setActiveLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModal, setActiveModal] = useState(null)

  // Filtered loans based on search
  const filteredLoans = activeLoans.filter(loan => 
    loan.User.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.Book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-primary-text tracking-tight">Circulation Desk</h1>
        <p className="text-secondary-text mt-1">Manage physical book movements and policy overrides.</p>
      </header>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <CirculationAction 
          icon={<RotateCcw className="text-blue-500" />} 
          title="Process Return" 
          desc="Scan book to check back in"
          onClick={() => setActiveModal('return')}
        />
        <CirculationAction 
          icon={<UserPlus className="text-brand-text" />} 
          title="Manual Loan" 
          desc="Borrow for a member"
          onClick={() => toast("Loan Modal Coming Soon")}
        />
        <CirculationAction 
          icon={<ShieldAlert className="text-red-text" />} 
          title="Override" 
          desc="Bypass loan restrictions"
          onClick={() => toast("Override Modal Coming Soon")}
        />
      </div>
      {/* modals */}
      <ReturnModal 
            isOpen={activeModal === 'return'} 
            onClose={() => setActiveModal(null)} 
            onReturnSuccess={(id) => toast.success(`Book ${id} returned!`)}
          />

      {/* Main Table Section */}
      <div className="bg-secondary-bg border border-border-subtle rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border-subtle flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="font-bold text-lg text-primary-text">Live Circulation List</h2>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" size={18} />
            <input 
              type="text"
              placeholder="Search user or book..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-input-bg border-none rounded-xl pl-10 pr-4 py-2.5 text-sm text-primary-text focus:ring-2 ring-accent-base transition-all"
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
              {filteredLoans.length > 0 ? (
                filteredLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-input-bg/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-light text-brand-text flex items-center justify-center text-xs font-bold">
                          {loan.User.name[0]}
                        </div>
                        <span className="font-bold text-primary-text text-sm">{loan.User.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-primary-text font-medium truncate max-w-[200px]">
                        {loan.Book.title}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-xs text-secondary-text">
                      {new Date(loan.borrowed_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-primary-text">
                      {new Date(loan.due_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                       <LoanStatusBadge dueDate={loan.due_date} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-input-bg rounded-lg text-secondary-text transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <Search size={40} />
                      <p className="font-bold text-primary-text">No active loans found</p>
                    </div>
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


