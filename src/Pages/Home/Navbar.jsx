import { Link, useLocation } from "react-router-dom";
import NavList from "./NavList.json";
import ContactFormModal from "../../Components/Contact Us/ContactFormModal";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <nav className="h-16 w-full px-4 md:px-8 lg:px-16">
      <div className="h-full max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-12" />
          </Link>
        </div>

        {/* Middle: Nav links */}
        <ul className="flex gap-8 text-gray-700 font-medium md:hidden sm:hidden">
          {NavList.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <li key={item.key}>
                <Link
                  to={item.url}
                  className={`cursor-pointer transition-all select-none capitalize ${
                    isActive
                      ? "text-[#54bd95] font-semibold"
                      : "text-[#a9a9a9] hover:text-[#54bd95] hover:font-semibold"
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Buttons */}
        <div className="flex items-center gap-4">
          {/* Contact Us button */}
          <button
            onClick={() => setIsContactOpen(true)}
            className="px-4 py-2 rounded-lg bg-[#54bd95] text-white font-medium hover:bg-[#3da97d] transition select-none"
          >
            Contact Us
          </button>

          {/* Login button */}
          <Link
            to="/login"
            className="px-4 select-none py-2 rounded-lg border-2 hover:border-solid delay-75 hover:border-[#54bd95] border-hidden text-[#54bd95] font-medium hover:bg-[#eafaf3] transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </nav>
  );
}
