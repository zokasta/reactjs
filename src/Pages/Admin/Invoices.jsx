import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, X } from "lucide-react";

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

// Invoice Table
function InvoiceTable({ invoices, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-light text-gray-dark">
            <th className="p-3">Invoice ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {invoices.map((inv, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="border-b hover:bg-gray-light/40"
              >
                <td className="p-3 font-medium">{inv.id}</td>
                <td className="p-3">{inv.customer}</td>
                <td className="p-3">{inv.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        inv.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : inv.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {inv.status}
                  </span>
                </td>
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

export default function Invoices() {
  const [invoices, setInvoices] = useState([
    { id: "#INV001", customer: "John Doe", amount: "$1200", status: "Paid" },
    { id: "#INV002", customer: "Jane Smith", amount: "$850", status: "Pending" },
    { id: "#INV003", customer: "Michael Lee", amount: "$3000", status: "Paid" },
    { id: "#INV004", customer: "Sarah Kim", amount: "$2100", status: "Overdue" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ id: "", customer: "", amount: "", status: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ customer: "", status: "", amount: "" });

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...invoices];
      updated[editingIndex] = form;
      setInvoices(updated);
    } else {
      setInvoices([...invoices, form]);
    }
    setForm({ id: "", customer: "", amount: "", status: "" });
    setEditingIndex(null);
    setModalOpen(false);
  };

  const handleEdit = (index) => {
    setForm(invoices[index]);
    setEditingIndex(index);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    setInvoices(invoices.filter((_, i) => i !== index));
  };

  // Apply filters
  const filteredInvoices = invoices.filter((inv) => {
    return (
      (filters.customer === "" ||
        inv.customer.toLowerCase().includes(filters.customer.toLowerCase())) &&
      (filters.status === "" || inv.status === filters.status) &&
      (filters.amount === "" || inv.amount.includes(filters.amount))
    );
  });

  const visibleInvoices = filteredInvoices.slice(0, rowsPerPage);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-secondary">Manage Invoices</h2>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg shadow hover:bg-secondary-dark transition"
        >
          Show Filters
        </button>

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

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark transition"
        >
          <Plus size={18} /> Add Invoice
        </button>
      </div>

      {/* Filters form */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white p-4 rounded-xl shadow space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Customer"
                value={filters.customer}
                onChange={(e) =>
                  setFilters({ ...filters, customer: e.target.value })
                }
                className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
              />
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
              <input
                type="text"
                placeholder="Amount"
                value={filters.amount}
                onChange={(e) =>
                  setFilters({ ...filters, amount: e.target.value })
                }
                className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <InvoiceTable
        invoices={visibleInvoices}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal for Add/Edit */}
      <AnimatePresence>
        {modalOpen && (
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <h3 className="text-xl font-semibold mb-4">
              {editingIndex !== null ? "Edit Invoice" : "Add Invoice"}
            </h3>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                type="text"
                placeholder="Invoice ID"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                required
              />
              <input
                type="text"
                placeholder="Customer"
                value={form.customer}
                onChange={(e) => setForm({ ...form, customer: e.target.value })}
                className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                required
              />
              <input
                type="text"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                required
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                required
              >
                <option value="">Select Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark transition"
              >
                {editingIndex !== null ? "Update Invoice" : "Add Invoice"}
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
