import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/common/Modal";
import RowsSelector from "../../Components/common/RowsSelector";
import FilterForm from "../../Components/common/FilterForm";
import ActionButtons from "../../Components/common/ActionButtons";
import Button from "../../Components/common/Button";

// MUI Icons
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AddIcon from "@mui/icons-material/Add";

export default function AdminLeads() {
  const navigate = useNavigate();

  const [rows, setRows] = useState(5);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [selectedLead, setSelectedLead] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Draft",
    remarks: "",
  });

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+911234567890",
      company: "ABC Pvt Ltd",
      status: "Draft",
      remarks: "Initial contact made.",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+911098765432",
      company: "XYZ Corp",
      status: "Pending",
      remarks: "Waiting for response.",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+911112223334",
      company: "Acme Inc",
      status: "Paid",
      remarks: "",
    },
  ]);

  const filteredLeads = leads.filter((lead) => {
    return (
      (!filters.name ||
        lead.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.email ||
        lead.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.phone ||
        lead.phone.toLowerCase().includes(filters.phone.toLowerCase())) &&
      (!filters.company ||
        lead.company.toLowerCase().includes(filters.company.toLowerCase()))
    );
  });

  const visibleLeads = filteredLeads.slice(0, rows);

  const handleDelete = () => {
    if (confirmDeleteIndex !== null) {
      setLeads(leads.filter((_, i) => i !== confirmDeleteIndex));
      setConfirmDeleteIndex(null);
    }
  };

  const handleUpdateStatus = (status) => {
    if (selectedLead !== null) {
      const updated = leads.map((lead) =>
        lead.id === selectedLead.id ? { ...lead, status } : lead
      );
      setLeads(updated);
      setSelectedLead({ ...selectedLead, status });
    }
  };

  const handleAddLead = () => {
    const id = leads.length ? Math.max(...leads.map((l) => l.id)) + 1 : 1;
    setLeads([...leads, { ...newLead, id }]);
    setNewLead({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "Draft",
      remarks: "",
    });
    setShowAddModal(false);
  };

  const statusColors = {
    Draft: "bg-gray-200 text-gray-700",
    Pending: "bg-yellow-200 text-yellow-700",
    Paid: "bg-green-200 text-green-700",
    Lost: "bg-red-200 text-red-700",
    FollowUp: "bg-blue-200 text-blue-700",
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-secondary">Manage Leads</h2>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setShowFilter(!showFilter)}>
            Show Filters
          </Button>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <AddIcon fontSize="small" className="mr-1" /> Add Lead
          </Button>
        </div>
        <RowsSelector value={rows} onChange={setRows} />
      </div>

      {/* Filters */}
      <FilterForm
        show={showFilter}
        filters={filters}
        setFilters={setFilters}
        fields={[
          { key: "name", placeholder: "Lead Name" },
          { key: "email", placeholder: "Email" },
          { key: "phone", placeholder: "Phone" },
          { key: "company", placeholder: "Company" },
        ]}
        onClear={() => setFilters({})}
        onApply={() => setShowFilter(false)}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-light text-gray-dark">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Company</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleLeads.map((lead, i) => (
              <tr key={lead.id} className="border-b hover:bg-gray-light/40">
                <td className="p-3">{lead.name}</td>
                <td className="p-3">{lead.email}</td>
                <td className="p-3">{lead.phone}</td>
                <td className="p-3">{lead.company}</td>
                <td className="p-3">
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className={`px-2 py-1 rounded-md text-sm font-medium ${statusColors[lead.status]}`}
                  >
                    {lead.status}
                  </button>
                </td>
                <td className="p-3 flex gap-2 justify-center flex-wrap">
                  {/* Default Edit/Delete */}
                  <ActionButtons
                    onEdit={() => setSelectedLead(lead)}
                    onDelete={() => setConfirmDeleteIndex(i)}
                  />
                  {/* Custom Buttons */}
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition text-blue-500"
                    title="Details"
                  >
                    <InfoOutlinedIcon fontSize="small" />
                  </button>
                  <button
                    onClick={() => window.open(`tel:${lead.phone}`)}
                    className="p-2 bg-green-100 rounded-md hover:bg-green-200 transition text-green-500"
                    title="Call"
                  >
                    <PhoneIcon fontSize="small" />
                  </button>
                  <button
                    onClick={() => window.open(`mailto:${lead.email}`)}
                    className="p-2 bg-purple-100 rounded-md hover:bg-purple-200 transition text-purple-500"
                    title="Email"
                  >
                    <EmailIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lead Details & Status Modal */}
      <Modal
        isOpen={selectedLead !== null}
        onClose={() => setSelectedLead(null)}
      >
        {selectedLead && (
          <>
            <h3 className="text-xl font-semibold mb-4">Lead Details</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span> {selectedLead.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {selectedLead.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {selectedLead.phone}
              </p>
              <p>
                <span className="font-medium">Company:</span> {selectedLead.company}
              </p>
              <p>
                <span className="font-medium">Status:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleUpdateStatus(e.target.value)}
                  className="ml-2 border rounded-md px-2 py-1 focus:ring-2 focus:ring-primary outline-none"
                >
                  {Object.keys(statusColors).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <span className="font-medium">Remarks:</span>
              </p>
              <textarea
                value={selectedLead.remarks}
                onChange={(e) =>
                  setSelectedLead({ ...selectedLead, remarks: e.target.value })
                }
                rows={6}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-primary outline-none resize-none"
              ></textarea>
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <Button
                variant="primary"
                onClick={() => {
                  setLeads(
                    leads.map((lead) =>
                      lead.id === selectedLead.id ? selectedLead : lead
                    )
                  );
                  setSelectedLead(null);
                }}
              >
                Save
              </Button>
              <Button variant="light" onClick={() => setSelectedLead(null)}>
                Close
              </Button>
            </div>
          </>
        )}
      </Modal>

      {/* Add Lead Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <h3 className="text-xl font-semibold mb-4">Add New Lead</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={newLead.name}
            onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
            className="w-full border rounded-md p-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={newLead.email}
            onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
            className="w-full border rounded-md p-2"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={newLead.phone}
            onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
            className="w-full border rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Company"
            value={newLead.company}
            onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
            className="w-full border rounded-md p-2"
          />
          <select
            value={newLead.status}
            onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
            className="w-full border rounded-md p-2"
          >
            {Object.keys(statusColors).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Remarks"
            value={newLead.remarks}
            onChange={(e) => setNewLead({ ...newLead, remarks: e.target.value })}
            rows={4}
            className="w-full border rounded-md p-2 resize-none"
          ></textarea>
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <Button variant="light" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddLead}>
            Add Lead
          </Button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={confirmDeleteIndex !== null}
        onClose={() => setConfirmDeleteIndex(null)}
      >
        <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
        <p className="text-gray-600 mb-6">
          Do you really want to delete{" "}
          <span className="font-medium">
            {leads[confirmDeleteIndex]?.name}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="light" onClick={() => setConfirmDeleteIndex(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
