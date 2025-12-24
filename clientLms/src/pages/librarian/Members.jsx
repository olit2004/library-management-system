// pages/librarian/Members.jsx
import React, { useState, useEffect } from "react";
import StatusBadge from "../../components/ui/StatusBadge";
import { 
  Users, Search, Filter, Mail, Phone, 
  ShieldCheck, ShieldAlert, MoreHorizontal 
} from "lucide-react";

export default function MemberManagement() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for structural reference
  const mockMembers = [
    { id: 1, name: "Abebe Kebede", email: "abebe@email.com", joined: "2023-10-12", status: "Active", loans: 2 },
    { id: 2, name: "Chala Silva", email: "chala@email.com", joined: "2024-01-05", status: "Suspended", loans: 0 },
  ];

  const filteredMembers = mockMembers.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-primary-text tracking-tight flex items-center gap-3">
            <Users className="text-brand-text" />
            Member Directory
          </h1>
          <p className="text-secondary-text mt-1">Manage library memberships and account privileges.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" size={18} />
            <input 
              type="text"
              placeholder="Search members..."
              className="w-full bg-secondary-bg border border-border-subtle rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 ring-accent-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2.5 bg-secondary-bg border border-border-subtle rounded-xl text-secondary-text hover:text-primary-text transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </header>

      {/* Members Table */}
      <div className="bg-secondary-bg border border-border-subtle rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-input-bg/50 text-secondary-text text-[10px] uppercase tracking-widest font-black">
              <tr>
                <th className="px-6 py-4">Member Info</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-center">Active Loans</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-input-bg/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent-light text-brand-text flex items-center justify-center font-bold">
                        {member.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary-text">{member.name}</p>
                        <p className="text-xs text-muted-text flex items-center gap-1">
                          <Mail size={12} /> {member.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={member.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-text">
                    {new Date(member.joined).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-bold text-primary-text">{member.loans}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-muted-text hover:text-primary-text transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

