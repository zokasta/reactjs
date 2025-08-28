import { motion, AnimatePresence } from "framer-motion";

export default function Table({ headers, data, renderRow }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-light text-gray-dark">
            {headers.map((h, i) => (
              <th key={i} className="p-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {data.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="border-b hover:bg-gray-light/40"
              >
                {renderRow(row, i)}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
