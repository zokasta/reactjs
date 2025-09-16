import { MdMenu, MdNotifications, MdAccountCircle } from "react-icons/md";

export default function Topbar({ onToggleSidebar }) {
  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-4">
      <button
        onClick={onToggleSidebar}
        className="text-gray-dark hover:text-primary"
      >
        <MdMenu size={24} />
      </button>

      <div className="flex items-center gap-6">
        <MdNotifications size={24} className="text-gray-dark" />
        <MdAccountCircle size={28} className="text-gray-dark" />
      </div>
    </header>
  );
}
