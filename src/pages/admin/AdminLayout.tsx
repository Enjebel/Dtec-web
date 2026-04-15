import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Layers, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  ExternalLink 
} from "lucide-react";
import { useState } from "react";
import { useClerk } from "@clerk/clerk-react";

const LOGO = "/icon/icon-192.png";

export default function AdminLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { signOut } = useClerk(); // Clerk logout hook
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Overview", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { label: "Sectors", path: "/admin/sectors", icon: <Layers size={18} /> },
    { label: "Messages", path: "/admin/messages", icon: <MessageSquare size={18} /> },
    { label: "Users", path: "/admin/users", icon: <Users size={18} /> },
    { label: "Settings", path: "/admin/settings", icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    signOut(() => navigate("/")); // Redirect to home after logout
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between z-50">
        <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-600">
          <Menu size={24} />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <img src={LOGO} alt="DTEC" className="h-8 w-8 object-contain" />
        </div>
        <div className="w-6" />
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-8 flex items-center gap-3">
          <img src={LOGO} alt="DTEC" className="h-8 w-8" />
          <h1 className="text-xl font-black tracking-tighter uppercase italic text-white leading-none">
            Admin<span className="text-orange-500">.</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {/* New: Link back to Main Site */}
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-orange-400 hover:bg-orange-500 hover:text-white transition-all mb-6 border border-orange-500/30"
          >
            <ExternalLink size={16} /> View Website
          </Link>

          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                pathname === item.path 
                ? "bg-orange-500 text-white shadow-lg shadow-orange-900/20" 
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        {/* ACTIVE LOGOUT BUTTON */}
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-500 font-bold text-sm hover:text-orange-500 transition-colors w-full group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" /> 
            Exit System
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10 pt-20 lg:pt-10">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}