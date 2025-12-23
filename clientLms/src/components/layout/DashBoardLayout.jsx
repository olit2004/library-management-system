import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, Search, User, Sun, Moon } from "lucide-react"; // Import Sun and Moon icons
import { Outlet } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme.jsx"; // Import the useTheme hook

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Use the theme hook

  return (
    <div className="min-h-screen bg-primary-bg lg:grid lg:grid-cols-[18rem_1fr] lg:grid-rows-[4rem_1fr] transition-colors">

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Header */}
      <header className="
        fixed top-0 left-0 right-0 z-30 h-16 px-4
        flex items-center justify-between
        bg-secondary-bg border-b border-border-subtle
        lg:static lg:col-start-2 lg:row-start-1 transition-colors
      ">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 lg:hidden text-secondary-text"
        >
          <Menu size={24} />
        </button>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text"
              size={18}
            />
            <input
              type="text"
              placeholder="Search books..."
              className="w-full bg-input-bg rounded-full py-2 pl-10 pr-4 text-sm
                         text-primary-text border-none focus:ring-2 focus:ring-accent-light transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-hover-light text-secondary-text transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <span className="hidden sm:block text-sm font-medium text-primary-text">
            Leo D.
          </span>
          <div className="w-9 h-9 rounded-full bg-input-bg border-border-input overflow-hidden flex items-center justify-center">
            <User size={36} className="text-muted-text pt-2 pl-1" />
          </div>
        </div>
      </header>

      {/* Main Content (Scrollable) */}
      <main className="
        pt-20 px-4 pb-4
        lg:pt-0 lg:px-8 lg:pb-8
        lg:col-start-2 lg:row-start-2
        overflow-y-auto
      ">
        <Outlet/>
      </main>
    </div>
  );
}