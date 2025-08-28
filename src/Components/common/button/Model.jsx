import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative"
          >
            <button
              className="absolute top-4 right-4 text-gray hover:text-gray-dark"
              onClick={onClose}
            >
              <X size={22} />
            </button>
            {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
