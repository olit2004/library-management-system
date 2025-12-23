import { useAuth } from "../../hooks/useAuth.jsx";
import { Compass, BookOpen, Clock, Bookmark, LogOut, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";


export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: "Discover", icon: Compass, path: "/member" },
    { label: "Active Loans", icon: BookOpen, path: "/member/my-loans" },
    { label: "Reservations", icon: Bookmark, path: "/member/reservations" },
    { label: "History", icon: Clock, path: "/member/history" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Stuck to the left */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 p-4 flex flex-col
        bg-secondary-bg border-r border-border-subtle
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex items-center justify-between px-4 mb-10 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-base rounded-lg flex items-center justify-center">
              <BookOpen className="text-on-accent-text w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-primary-text">Library</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-secondary-text">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all transition-colors ${
                location.pathname === item.path
                  ? "bg-accent-light text-brand-text"
                  : "text-secondary-text hover:bg-hover-light"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-red-text hover:bg-red-hover-bg rounded-xl mt-auto transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>
    </>
  );
}