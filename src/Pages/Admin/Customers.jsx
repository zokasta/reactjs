  import { useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { Plus, X, Phone, Mail, FileText, Eye } from "lucide-react";
  import { useNavigate } from "react-router-dom";

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

  function CustomerTable({ customers, onDetails }) {
    const navigate = useNavigate();

    return (
      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-light text-gray-dark">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Location</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {customers.map((cust, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="border-b hover:bg-gray-light/40"
                >
                  <td className="p-3 font-medium">{cust.name}</td>
                  <td className="p-3">{cust.email}</td>
                  <td className="p-3">{cust.phone}</td>
                  <td className="p-3">{cust.location}</td>
                  <td className="p-3 flex gap-3 justify-center flex-wrap">
                    {/* Details */}
                    <button
                      onClick={() => onDetails(cust)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                    >
                      <Eye size={16} /> Details
                    </button>

                    {/* Call */}
                    <a
                      href={`tel:${cust.phone}`}
                      className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                    >
                      <Phone size={16} /> Call
                    </a>

                    {/* Email */}
                    <a
                      href={`mailto:${cust.email}`}
                      className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition"
                    >
                      <Mail size={16} /> Email
                    </a>

                    {/* Invoices */}
                    <button
                      onClick={() => navigate(`/invoices?customer=${cust.id}`)}
                      className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition"
                    >
                      <FileText size={16} /> Invoices
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

  export default function Customers() {
    const [customers, setCustomers] = useState([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "+91-9876543210",
        location: "Mumbai, India",
        details: "VIP customer since 2018, prefers yearly billing.",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1-202-555-0199",
        location: "New York, USA",
        details: "Corporate client, 12 employees under her account.",
      },
      {
        id: 3,
        name: "Michael Lee",
        email: "michael@example.com",
        phone: "+44-7700-900123",
        location: "London, UK",
        details: "Subscribed to premium plan, frequent invoice delays.",
      },
    ]);

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ name: "", email: "" });

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Filters
    const filteredCustomers = customers.filter(
      (c) =>
        (filters.name === "" ||
          c.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.email === "" ||
          c.email.toLowerCase().includes(filters.email.toLowerCase()))
    );

    const visibleCustomers = filteredCustomers.slice(0, rowsPerPage);

    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-secondary">Manage Customers</h2>

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
            onClick={() => alert("Add Customer modal coming soon!")}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark transition"
          >
            <Plus size={18} /> Add Customer
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Search Name"
                  value={filters.name}
                  onChange={(e) =>
                    setFilters({ ...filters, name: e.target.value })
                  }
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                />
                <input
                  type="text"
                  placeholder="Search Email"
                  value={filters.email}
                  onChange={(e) =>
                    setFilters({ ...filters, email: e.target.value })
                  }
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <CustomerTable
          customers={visibleCustomers}
          onDetails={(cust) => {
            setSelectedCustomer(cust);
            setModalOpen(true);
          }}
        />

        {/* Details Modal */}
        <AnimatePresence>
          {modalOpen && selectedCustomer && (
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
              <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {selectedCustomer.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedCustomer.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedCustomer.phone}
                </p>
                <p>
                  <strong>Location:</strong> {selectedCustomer.location}
                </p>
                <p>
                  <strong>Notes:</strong> {selectedCustomer.details}
                </p>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    );
  }
