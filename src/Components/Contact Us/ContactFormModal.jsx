import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ContactFormModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
  });

  // Close modal when pressing ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you! Our team will contact you within 2-3 hours.");
      onClose();
      setForm({ name: "", email: "", mobile: "", company: "" });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white w-11/12 max-w-md rounded-2xl shadow-lg p-6 relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={loading}
              className="absolute top-3 right-3 text-gray-400 hover:text-[#54bd95] text-xl disabled:cursor-not-allowed"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-[#081c4e] mb-4 text-center">
              Contact Us
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95] disabled:bg-gray-100"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95] disabled:bg-gray-100"
                  required
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter your number"
                  value={form.mobile}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95] disabled:bg-gray-100"
                  required
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Enter company name"
                  value={form.company}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-[#54bd95] disabled:bg-gray-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-lg font-medium transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#54bd95] text-white hover:bg-[#3da97d]"
                }`}
              >
                {loading ? "Submitting..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
