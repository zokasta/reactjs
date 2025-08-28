import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Phone, Mail, UserPlus, Eye } from "lucide-react";

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

function LeadTable({ leads, onDetails, onConvert }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-light text-gray-dark">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {leads.map((lead, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="border-b hover:bg-gray-light/40"
              >
                <td className="p-3 font-medium">{lead.name}</td>
                <td className="p-3">{lead.email}</td>
                <td className="p-3">{lead.phone}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lead.status === "New"
                        ? "bg-blue-100 text-blue-700"
                        : lead.status === "Contacted"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="p-3 flex gap-3 justify-center flex-wrap">
                  {/* Details */}
                  <button
                    onClick={() => onDetails(lead)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                  >
                    <Eye size={16} /> Details
                  </button>

                  {/* Call */}
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                  >
                    <Phone size={16} /> Call
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${lead.email}`}
                    className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition"
                  >
                    <Mail size={16} /> Email
                  </a>

                  {/* Convert */}
                  <button
                    onClick={() => onConvert(lead)}
                    className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition"
                  >
                    <UserPlus size={16} /> Convert
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

export default function Leads() {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Arjun Mehta",
      email: "arjun@example.com",
      phone: "+91-9876543210",
      status: "New",
      notes: "Interested in enterprise plan. Reached via LinkedIn.",
    },
    {
      id: 2,
      name: "Sophia Brown",
      email: "sophia@example.com",
      phone: "+1-202-555-0144",
      status: "Contacted",
      notes: "Asked for proposal. Wants quarterly billing.",
    },
    {
      id: 3,
      name: "Liam Chen",
      email: "liam@example.com",
      phone: "+44-7700-123456",
      status: "Converted",
      notes: "Now a paying customer since last week.",
    },
  ]);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ name: "", status: "" });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Filters
  const filteredLeads = leads.filter(
    (l) =>
      (filters.name === "" ||
        l.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.status === "" ||
        l.status.toLowerCase().includes(filters.status.toLowerCase()))
  );

  const visibleLeads = filteredLeads.slice(0, rowsPerPage);

  // Convert lead
  const handleConvert = (lead) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === lead.id ? { ...l, status: "Converted" } : l
      )
    );
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-secondary">Manage Leads</h2>

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
          onClick={() => alert("Add Lead modal coming soon!")}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark transition"
        >
          <Plus size={18} /> Add Lead
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
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Converted">Converted</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <LeadTable
        leads={visibleLeads}
        onDetails={(lead) => {
          setSelectedLead(lead);
          setModalOpen(true);
        }}
        onConvert={handleConvert}
      />

      {/* Details Modal */}
      <AnimatePresence>
        {modalOpen && selectedLead && (
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <h3 className="text-xl font-semibold mb-4">Lead Details</h3>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {selectedLead.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedLead.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedLead.phone}
              </p>
              <p>
                <strong>Status:</strong> {selectedLead.status}
              </p>
              <p>
                <strong>Notes:</strong> {selectedLead.notes}
              </p>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
