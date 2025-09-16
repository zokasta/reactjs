import { useState } from "react";
import Button from "../../Components/common/Button";
import RowsSelector from "../../Components/common/RowsSelector";
import FilterForm from "../../Components/common/FilterForm";
import Modal from "../../Components/common/Modal";
import ActionButtons from "../../Components/common/ActionButtons";

export default function InvoicesAdmin() {
  const [rows, setRows] = useState(5);
  const [filters, setFilters] = useState({
    customer: "",
    number: "",
    amount: "",
    status: "",
  });
  const [showFilter, setShowFilter] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    customer: "",
    number: "",
    amount: "",
    status: "Draft",
  });

  const [statusPopup, setStatusPopup] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const [invoices, setInvoices] = useState([
    { customer: "John Doe", number: "INV-001", amount: 1200, status: "Pending" },
    { customer: "Alice Smith", number: "INV-002", amount: 500, status: "Draft" },
    { customer: "Mega Corp", number: "INV-003", amount: 2500, status: "Paid" },
    { customer: "Tech Labs", number: "INV-004", amount: 800, status: "Overdue" },
  ]);

  const statuses = ["Draft", "Pending", "Paid", "Overdue", "Cancelled"];

  const filteredInvoices = invoices.filter((inv) => {
    return (
      (!filters.customer ||
        inv.customer.toLowerCase().includes(filters.customer.toLowerCase())) &&
      (!filters.number ||
        inv.number.toLowerCase().includes(filters.number.toLowerCase())) &&
      (!filters.amount || String(inv.amount) === String(filters.amount)) &&
      (!filters.status ||
        inv.status.toLowerCase().includes(filters.status.toLowerCase()))
    );
  });

  const visibleInvoices = filteredInvoices.slice(0, rows);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...invoices];
      updated[editingIndex] = form;
      setInvoices(updated);
    } else {
      setInvoices([...invoices, form]);
    }
    setForm({ customer: "", number: "", amount: "", status: "Draft" });
    setEditingIndex(null);
    setModalOpen(false);
  };

  const handleEdit = (index) => {
    setForm(invoices[index]);
    setEditingIndex(index);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (confirmDeleteIndex !== null) {
      setInvoices(invoices.filter((_, i) => i !== confirmDeleteIndex));
      setConfirmDeleteIndex(null);
    }
  };

  const handleChangeStatus = (index, newStatus) => {
    const updated = [...invoices];
    updated[index].status = newStatus;
    setInvoices(updated);
    setStatusPopup(null);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-secondary">Manage Invoices</h2>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <Button variant="secondary" onClick={() => setShowFilter(!showFilter)}>
          Show Filters
        </Button>
        <RowsSelector value={rows} onChange={setRows} />
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          + Add Invoice
        </Button>
      </div>

      {/* Filters */}
      <FilterForm
        show={showFilter}
        filters={filters}
        setFilters={setFilters}
        fields={[
          { key: "customer", placeholder: "Customer" },
          { key: "number", placeholder: "Invoice #" },
          { key: "amount", type: "number", placeholder: "Amount" },
          {
            key: "status",
            type: "select",
            placeholder: "Status",
            options: statuses.map((s) => ({ label: s, value: s })),
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
              <th className="p-3">Customer</th>
              <th className="p-3">Invoice #</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleInvoices.map((inv, i) => (
              <tr key={i} className="border-b hover:bg-gray-light/40 relative">
                <td className="p-3">{inv.customer}</td>
                <td className="p-3">{inv.number}</td>
                <td className="p-3">₹{inv.amount}</td>
                <td className="p-3 relative">
                  <span
                    className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                      inv.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : inv.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : inv.status === "Overdue"
                        ? "bg-red-100 text-red-700"
                        : inv.status === "Cancelled"
                        ? "bg-gray-300 text-gray-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                    onClick={() =>
                      setStatusPopup(statusPopup === i ? null : i)
                    }
                  >
                    {inv.status}
                  </span>

                  {/* Status popup */}
                  {statusPopup === i && (
                    <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-2 z-50 w-40">
                      {statuses.map((s) => (
                        <div
                          key={s}
                          onClick={() => handleChangeStatus(i, s)}
                          className={`px-3 py-1 cursor-pointer rounded mb-1 last:mb-0 
                            ${
                              s === "Paid"
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : s === "Pending"
                                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                : s === "Overdue"
                                ? "bg-red-100 text-red-700 hover:bg-red-200"
                                : s === "Cancelled"
                                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            }`}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </td>

                <td className="p-3">
                  <ActionButtons
                    onEdit={() => handleEdit(i)}
                    onDelete={() => setConfirmDeleteIndex(i)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Add/Edit Invoice */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="text-xl font-semibold mb-4">
          {editingIndex !== null ? "Edit Invoice" : "Add Invoice"}
        </h3>
        <form onSubmit={handleSubmit} className="grid gap-4">
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
            placeholder="Invoice #"
            value={form.number}
            onChange={(e) => setForm({ ...form, number: e.target.value })}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="number"
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
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <Button type="submit" variant="primary">
            {editingIndex !== null ? "Update Invoice" : "Add Invoice"}
          </Button>
        </form>
      </Modal>

      {/* ✅ Confirmation Delete Modal */}
      <Modal
        isOpen={confirmDeleteIndex !== null}
        onClose={() => setConfirmDeleteIndex(null)}
      >
        <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
        <p className="text-gray-600 mb-6">
          Do you really want to delete{" "}
          <span className="font-medium">
            {invoices[confirmDeleteIndex]?.number}
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
