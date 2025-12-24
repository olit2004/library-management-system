// components/layouts/LibrarianLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { 
  LayoutDashboard, BookCopy, Users, CalendarCheck, 
  Menu, X, Sun, Moon, LogOut, ChevronRight 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

export default function LibrarianLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Overview", path: "/librarian" },
    { icon: <BookCopy size={20} />, label: "Circulation", path: "/librarian/circulation" },
    { icon: <CalendarCheck size={20} />, label: "Reservations", path: "/librarian/reservations" },
    { icon: <Users size={20} />, label: "Members", path: "/librarian/users" },
  ];

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-primary-bg transition-colors duration-300">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-secondary-bg border-r border-border-subtle 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-8 flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tighter text-brand-text italic">
              KUUSAA.STAFF
            </h2>
            <button onClick={closeSidebar} className="lg:hidden text-secondary-text">
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`
                    flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all
                    ${isActive 
                      ? "bg-accent-base text-on-accent-text shadow-lg shadow-accent-base/20" 
                      : "text-secondary-text hover:bg-input-bg hover:text-primary-text"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={16} />}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-6 border-t border-border-subtle space-y-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-input-bg rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-accent-base flex items-center justify-center text-white text-xs font-bold">
                    AD
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold text-primary-text truncate">Admin Staff</p>
                    <p className="text-[10px] text-muted-text">Librarian</p>
                </div>
            </div>
            <button className="flex items-center gap-3 px-4 py-3 text-red-text hover:bg-red-hover-bg rounded-xl w-full transition-colors font-bold text-sm">
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-secondary-bg border-b border-border-subtle sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-secondary-text lg:hidden hover:bg-input-bg rounded-xl transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:block">
               <p className="text-xs font-bold text-muted-text uppercase tracking-widest">System Portal</p>
               <p className="text-sm font-bold text-primary-text italic">Main Branch Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-3 bg-input-bg text-primary-text rounded-2xl hover:ring-2 ring-accent-base/30 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
         <Outlet/>
        </main>
      </div>
    </div>
  );
}