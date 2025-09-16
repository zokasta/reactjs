import { Link, useLocation } from "react-router-dom";
import * as MdIcons from "react-icons/md";

export default function Sidebar({ role, isOpen }) {
  const location = useLocation();
  const { [role]: items } = require("../../data/navItems");

  return (
    <aside
      className={`bg-secondary-dark text-white h-screen p-4 fixed top-0 left-0 transition-all ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <h1 className="text-xl font-bold mb-8">{role.toUpperCase()}</h1>
      <ul className="space-y-4">
        {items.map((item) => {
          const Icon = MdIcons[item.icon];
          const active = location.pathname === item.path;
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-2 rounded-md transition ${
                  active ? "bg-primary text-white" : "hover:bg-primary-dark"
                }`}
              >
                <Icon size={20} />
                {isOpen && <span>{item.title}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
