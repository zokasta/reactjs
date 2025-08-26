import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, X, Filter } from "lucide-react";

// Reusable Modal
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
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
        {children}
      </motion.div>
    </div>
  );
}

// Tax Table
function TaxTable({ taxes, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-light text-gray-dark">
            <th className="p-3">Country</th>
            <th className="p-3">Tax Name</th>
            <th className="p-3">Rate (%)</th>
            <th className="p-3">Type</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {taxes.map((tax, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="border-b hover:bg-gray-light/40"
              >
                <td className="p-3">{tax.country}</td>
                <td className="p-3">{tax.name}</td>
                <td className="p-3">{tax.rate}%</td>
                <td className="p-3">{tax.type}</td>
                <td className="p-3 flex gap-3 justify-center">
                  <button
                    onClick={() => onEdit(i)}
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(i)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

export default function AdminTaxes() {
  const [taxes, setTaxes] = useState([
    { country: "India", name: "GST", rate: 18, type: "Indirect" },
    { country: "USA", name: "Sales Tax", rate: 7, type: "Indirect" },
    { country: "UK", name: "VAT", rate: 20, type: "Indirect" },
    { country: "Germany", name: "MwSt", rate: 19, type: "Indirect" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    country: "",
    name: "",
    rate: "",
    type: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter state
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({
    country: "",
    name: "",
    rate: "",
    type: "",
  });

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...taxes];
      updated[editingIndex] = form;
      setTaxes(updated);
    } else {
      setTaxes([...taxes, form]);
    }
    setForm({ country: "", name: "", rate: "", type: "" });
    setEditingIndex(null);
    setModalOpen(false);
  };

  const handleEdit = (index) => {
    setForm(taxes[index]);
    setEditingIndex(index);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    setTaxes(taxes.filter((_, i) => i !== index));
  };

  // Filtering logic (perfect match)
  const filteredTaxes = taxes.filter((tax) => {
    return (
      (!filter.country ||
        tax.country.toLowerCase() === filter.country.toLowerCase()) &&
      (!filter.name || tax.name.toLowerCase() === filter.name.toLowerCase()) &&
      (!filter.rate || String(tax.rate) === String(filter.rate)) &&
      (!filter.type || tax.type.toLowerCase() === filter.type.toLowerCase())
    );
  });

  const visibleTaxes = filteredTaxes.slice(0, rowsPerPage);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-secondary">Manage Taxes</h2>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        {/* Show Filters button */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg shadow hover:bg-secondary-dark transition"
        >
          Show Filters
        </button>

        {/* Rows dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-gray-dark">Rows:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>

        {/* Add Tax button */}
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark transition"
        >
          <Plus size={18} /> Add Tax
        </button>
      </div>

      {/* Filter Form (inline, animated) */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg shadow p-4 grid gap-4 md:grid-cols-4"
          >
            <input
              type="text"
              placeholder="Country"
              value={filter.country}
              onChange={(e) =>
                setFilter({ ...filter, country: e.target.value })
              }
              className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            />
            <input
              type="text"
              placeholder="Tax Name"
              value={filter.name}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            />
            <input
              type="number"
              placeholder="Rate (%)"
              value={filter.rate}
              onChange={(e) => setFilter({ ...filter, rate: e.target.value })}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            />
            <input
              type="text"
              placeholder="Type (Direct/Indirect)"
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            />
            <div className="col-span-full flex justify-end gap-3">
              <button
                onClick={() =>
                  setFilter({ country: "", name: "", rate: "", type: "" })
                }
                className="px-4 py-2 rounded-lg bg-gray-light hover:bg-gray/30 transition"
              >
                Clear
              </button>
              <button
                onClick={() => setShowFilter(false)}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition"
              >
                Apply
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <TaxTable
        taxes={visibleTaxes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal for Add/Edit */}
      <AnimatePresence>
        {modalOpen && (
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <h3 className="text-xl font-semibold mb-4">
              {editingIndex !== null ? "Edit Tax" : "Add Tax"}
            </h3>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                type="text"
                placeholder="Country"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                required
              />
              <input
                type="text"
                placeholder="Tax Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                required
              />
              <input
                type="number"
                placeholder="Rate (%)"
                value={form.rate}
                onChange={(e) => setForm({ ...form, rate: e.target.value })}
                className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                required
              />
              <input
                type="text"
                placeholder="Type (Direct/Indirect)"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                required
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark transition"
              >
                {editingIndex !== null ? "Update Tax" : "Add Tax"}
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
