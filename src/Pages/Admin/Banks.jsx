import { useState } from "react";
import Modal from "../../Components/common/Modal";
import RowsSelector from "../../Components/common/RowsSelector";
import FilterForm from "../../Components/common/FilterForm";
import ActionButtons from "../../Components/common/ActionButtons";
import Button from "../../Components/common/Button";

export default function AdminBanks() {
  const [rows, setRows] = useState(5);
  const [filters, setFilters] = useState({
    name: "",
    accountNumber: "",
    status: "",
  });
  const [showFilter, setShowFilter] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBank, setEditingBank] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const [banks, setBanks] = useState([
    {
      id: 1,
      name: "State Bank of India",
      accountNumber: "1234567890",
      accountHolder: "John Doe",
      branch: "MG Road",
      ifsc: "SBIN0001234",
      status: "Active",
    },
    {
      id: 2,
      name: "HDFC Bank",
      accountNumber: "9876543210",
      accountHolder: "Jane Smith",
      branch: "Andheri",
      ifsc: "HDFC0005678",
      status: "Inactive",
    },
  ]);

  const statusColors = {
    Active: "bg-green-200 text-green-700",
    Inactive: "bg-red-200 text-red-700",
  };

  const filteredBanks = banks.filter((b) => {
    return (
      (!filters.name || b.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.accountNumber ||
        b.accountNumber.includes(filters.accountNumber)) &&
      (!filters.status || b.status === filters.status)
    );
  });

  const visibleBanks = filteredBanks.slice(0, rows);

  const handleDelete = () => {
    if (confirmDeleteIndex !== null) {
      setBanks(banks.filter((_, i) => i !== confirmDeleteIndex));
      setConfirmDeleteIndex(null);
    }
  };

  const handleSaveBank = (form) => {
    if (editingBank) {
      const updated = banks.map((b) =>
        b.id === editingBank.id ? { ...form, id: editingBank.id } : b
      );
      setBanks(updated);
    } else {
      setBanks([...banks, { ...form, id: Date.now() }]);
    }
    setEditingBank(null);
    setModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-secondary">Manage Banks</h2>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <Button
          variant="secondary"
          onClick={() => setShowFilter(!showFilter)}
        >
          Show Filters
        </Button>
        <RowsSelector value={rows} onChange={setRows} />
        <Button
          variant="primary"
          onClick={() => {
            setEditingBank(null);
            setModalOpen(true);
          }}
        >
          + Add Bank
        </Button>
      </div>

      {/* Filters */}
      <FilterForm
        show={showFilter}
        filters={filters}
        setFilters={setFilters}
        fields={[
          { key: "name", placeholder: "Bank Name" },
          { key: "accountNumber", placeholder: "Account Number" },
          {
            key: "status",
            type: "select",
            placeholder: "Status",
            options: [
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ],
          },
        ]}
        onClear={() => setFilters({})}
        onApply={() => setShowFilter(false)}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-light text-gray-dark">
              <th className="p-3">Bank Name</th>
              <th className="p-3">Account Number</th>
              <th className="p-3">Account Holder</th>
              <th className="p-3">Branch</th>
              <th className="p-3">IFSC</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleBanks.map((b, i) => (
              <tr key={b.id} className="border-b hover:bg-gray-light/40">
                <td className="p-3">{b.name}</td>
                <td className="p-3">{b.accountNumber}</td>
                <td className="p-3">{b.accountHolder}</td>
                <td className="p-3">{b.branch}</td>
                <td className="p-3">{b.ifsc}</td>
                <td className="p-3">
                  <button
                    onClick={() => setEditingBank(b)}
                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                      statusColors[b.status]
                    }`}
                  >
                    {b.status}
                  </button>
                </td>
                <td className="p-3 flex justify-center gap-2">
                  <ActionButtons
                    onEdit={() => {
                      setEditingBank(b);
                      setModalOpen(true);
                    }}
                    onDelete={() => setConfirmDeleteIndex(i)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Bank Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingBank(null);
        }}
      >
        <h3 className="text-xl font-semibold mb-4">
          {editingBank ? "Edit Bank" : "Add Bank"}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(
              new FormData(e.target).entries()
            );
            handleSaveBank(formData);
          }}
          className="grid gap-4"
        >
          <input
            type="text"
            name="name"
            defaultValue={editingBank?.name || ""}
            placeholder="Bank Name"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="text"
            name="accountNumber"
            defaultValue={editingBank?.accountNumber || ""}
            placeholder="Account Number"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="text"
            name="accountHolder"
            defaultValue={editingBank?.accountHolder || ""}
            placeholder="Account Holder"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="text"
            name="branch"
            defaultValue={editingBank?.branch || ""}
            placeholder="Branch"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          />
          <input
            type="text"
            name="ifsc"
            defaultValue={editingBank?.ifsc || ""}
            placeholder="IFSC"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <select
            name="status"
            defaultValue={editingBank?.status || "Active"}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          >
            {Object.keys(statusColors).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <Button type="submit" variant="primary">
              {editingBank ? "Update" : "Add"}
            </Button>
            <Button
              type="button"
              variant="light"
              onClick={() => {
                setModalOpen(false);
                setEditingBank(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={confirmDeleteIndex !== null}
        onClose={() => setConfirmDeleteIndex(null)}
      >
        <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
        <p className="text-gray-600 mb-6">
          Do you really want to delete{" "}
          <span className="font-medium">{banks[confirmDeleteIndex]?.name}</span>?
          This action cannot be undone.
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
