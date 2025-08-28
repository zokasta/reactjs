import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 🔥 Fullscreen Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* 🔥 Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg z-10"
      >
        <button
          className="absolute top-4 right-4 text-gray hover:text-gray-dark"
          onClick={onClose}
        >
          <X size={22} />
        </button>
        {children}
      </motion.div>
    </div>
  );
}
