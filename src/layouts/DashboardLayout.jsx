import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  CreditCard,
  Bug,
  Code,
  Building2,
  BarChart3,
  Layers,
} from "lucide-react";

export default function DashboardLayout({ role }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Role-based menu items
  const menus = {
    customer: [
      { name: "Dashboard", path: "dashboard", icon: <LayoutDashboard size={18} /> },
      { name: "Invoices", path: "invoices", icon: <FileText size={18} /> },
      { name: "Payments", path: "payments", icon: <CreditCard size={18} /> },
      { name: "Profile", path: "profile", icon: <Users size={18} /> },
      { name: "Settings", path: "settings", icon: <Settings size={18} /> },
    ],
    admin: [
      { name: "Dashboard", path: "dashboard", icon: <LayoutDashboard size={18} /> },
      { name: "Taxes", path: "taxes", icon: <Layers size={18} /> },
      { name: "Invoices", path: "invoices", icon: <FileText size={18} /> },
      { name: "Customers", path: "customers", icon: <Users size={18} /> },
      { name: "Leads", path: "leads", icon: <Users size={18} /> },
      { name: "Reviews", path: "reviews", icon: <Users size={18} /> },
      { name: "Reports", path: "reports", icon: <BarChart3 size={18} /> },
      { name: "Employees", path: "employees", icon: <Users size={18} /> },
      { name: "Payments", path: "payments", icon: <CreditCard size={18} /> },
      { name: "Banks", path: "banks", icon: <Building2 size={18} /> },
      { name: "Pages", path: "pages", icon: <Layers size={18} /> },
    ],
    developer: [
      { name: "API Calls", path: "api-calls", icon: <Code size={18} /> },
      { name: "Bugs & Errors", path: "bugs", icon: <Bug size={18} /> },
      { name: "Reports", path: "reports", icon: <BarChart3 size={18} /> },
      { name: "Users", path: "users", icon: <Users size={18} /> },
    ],
    employee: [
      { name: "Dashboard", path: "dashboard", icon: <LayoutDashboard size={18} /> },
      { name: "Invoices", path: "invoices", icon: <FileText size={18} /> },
      { name: "Customers", path: "customers", icon: <Users size={18} /> },
      { name: "Leads", path: "leads", icon: <Users size={18} /> },
      { name: "Reports", path: "reports", icon: <BarChart3 size={18} /> },
      { name: "Payments", path: "payments", icon: <CreditCard size={18} /> },
      { name: "Tickets", path: "tickets", icon: <FileText size={18} /> },
    ],
  };

  const links = menus[role] || [];

  return (
    <div className="flex h-screen bg-gray-light">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-52 transform bg-white shadow-lg transition-transform duration-300 
        xl:translate-x-0 xl:static xl:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 bg-primary text-white px-4">
          <span className="font-bold text-lg">{role.toUpperCase()} PANEL</span>
          <button
            className="xl:hidden p-2 rounded-md hover:bg-primary-dark"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="p-4 space-y-2">
          {links.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-primary text-white font-semibold"
                    : "text-gray-dark hover:bg-primary hover:text-white"
                }`
              }
              onClick={() => setSidebarOpen(false)} // auto-close on mobile
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between h-16 px-4 bg-white shadow-md">
          {/* Burger menu only for < xl */}
          <button
            className="xl:hidden p-2 rounded-md text-gray-dark hover:bg-gray-light"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <h1 className="font-bold text-xl text-secondary">
            {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray">Welcome, {role}</span>
            <img
              src={`https://i.pravatar.cc/40?u=${role}`}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        {/* Routed Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-light">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
