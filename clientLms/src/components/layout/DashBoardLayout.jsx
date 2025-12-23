import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, Search, User, Sun, Moon, X, LogOut, Settings } from "lucide-react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme.jsx";
import { useAuth } from "../../hooks/useAuth.jsx"; 

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth(); // Destructure user data and logout function
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Navigates to the member/discover page with the query param
    navigate(`/member?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-primary-bg lg:grid lg:grid-cols-[18rem_1fr] lg:grid-rows-[4rem_1fr] transition-colors">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <header className="sticky top-0 z-40 h-16 px-4 flex items-center justify-between bg-secondary-bg/80 backdrop-blur-md border-b border-border-subtle lg:col-start-2 lg:row-start-1 transition-colors ">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 lg:hidden text-secondary-text hover:bg-hover-light rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text group-focus-within:text-brand-text transition-colors" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for books, authors..."
              className="w-full bg-input-bg rounded-xl py-2 pl-10 pr-10 text-sm text-primary-text border border-transparent focus:border-accent-base focus:ring-4 focus:ring-accent-base/10 outline-none transition-all"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-primary-text">
                <X size={14} />
              </button>
            )}
          </div>
        </form>

        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={toggleTheme} className="p-2.5 rounded-xl hover:bg-hover-light text-secondary-text transition-colors" aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* User Profile Section */}
          <div className="flex items-center gap-3 pl-2 border-l border-border-subtle relative group">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-primary-text">
                {user?.first_name ? `${user.first_name} ${user.last_name?.charAt(0)}.` : "Guest"}
              </span>
              <span className="text-[10px] text-brand-text font-bold uppercase tracking-wider">
                {user?.role || "Member"}
              </span>
            </div>

            {/* Avatar Logic */}
            <div className="w-10 h-10 rounded-xl bg-accent-light border border-brand-text/10 overflow-hidden flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-brand-text/20 transition-all">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover"
                onError={(e) => { 
                    e.target.src = `https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg`; 
                  }} />
              ) : (
                <User size={24} className="text-brand-text translate-y-1" />
              )}
            </div>

            {/* Simple Hover Dropdown for Profile Actions */}
            <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="w-48 bg-secondary-bg border border-border-subtle rounded-xl shadow-xl p-2">
                <Link to="/member/profile" className="flex items-center gap-2 p-2 text-sm text-secondary-text hover:text-primary-text hover:bg-hover-light rounded-lg transition-colors">
                  <User size={16} /> Profile
                </Link>
                <Link to="/member/settings" className="flex items-center gap-2 p-2 text-sm text-secondary-text hover:text-primary-text hover:bg-hover-light rounded-lg transition-colors">
                  <Settings size={16} /> Settings
                </Link>
                <div className="my-1 border-t border-border-subtle" />
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-2 p-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="lg:col-start-2 lg:row-start-2 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}