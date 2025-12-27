// pages/librarian/Members.jsx
import React, { useState, useEffect } from "react";
import StatusBadge from "../../components/ui/StatusBadge";
import { useUsers } from "../../hooks/useUser";
import { 
  Users, Search, Mail, Loader2, 
  Trash2, ChevronLeft, ChevronRight 
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function MemberManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const { users, loading, pagination, fetchUsers, deactivateMember } = useUsers();

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const handleDeactivate = async (id) => {
    if (window.confirm("Deactivate this member?")) {
      const res = await deactivateMember(id);
      if (res.success) toast.success("Member deactivated");
      else toast.error(res.error);
    }
  };

  // Safe filtering: ensures users is an array
  const filteredMembers = (users || []).filter(m => {
    const fullName = `${m.first_name || ""} ${m.last_name || ""}`.toLowerCase();
    const email = (m.email || "").toLowerCase();
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || email.includes(search);
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-primary-text tracking-tight flex items-center gap-3">
            <Users className="text-brand-text" />
            Member Directory
          </h1>
          <p className="text-secondary-text mt-1">Manage library memberships.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" size={18} />
          <input 
            type="text"
            placeholder="Search by name or email..."
            className="w-full bg-secondary-bg border border-border-subtle rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 ring-accent-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="bg-secondary-bg border border-border-subtle rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-brand-text" size={32} />
            <p className="text-secondary-text animate-pulse">Fetching members...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-input-bg/50 text-secondary-text text-[10px] uppercase tracking-widest font-black">
                  <tr>
                    <th className="px-6 py-4">Member Info</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-input-bg/10 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent-light text-brand-text flex items-center justify-center font-bold">
                              {member.first_name?.[0]}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-primary-text">{member.first_name} {member.last_name}</p>
                              <p className="text-xs text-muted-text flex items-center gap-1"><Mail size={12} /> {member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={member.is_active !== false ? "Active" : "Inactive"} />
                        </td>
                        <td className="px-6 py-4 text-sm text-secondary-text">
                          {new Date(member.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleDeactivate(member.id)} className="p-2 text-muted-text hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-secondary-text">No members found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-border-subtle flex items-center justify-between bg-input-bg/20">
              <p className="text-xs text-secondary-text">
                Page {pagination.currentPage} of {pagination.totalPages}
              </p>
              <div className="flex gap-2">
                <button 
                  disabled={pagination.currentPage === 1 || loading}
                  onClick={() => fetchUsers(pagination.currentPage - 1)}
                  className="p-2 border border-border-subtle rounded-lg disabled:opacity-30 hover:bg-secondary-bg"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  disabled={pagination.currentPage === pagination.totalPages || loading}
                  onClick={() => fetchUsers(pagination.currentPage + 1)}
                  className="p-2 border border-border-subtle rounded-lg disabled:opacity-30 hover:bg-secondary-bg"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}