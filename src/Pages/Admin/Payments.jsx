import { useState } from "react";
import Modal from "../../Components/common/Modal";
import RowsSelector from "../../Components/common/RowsSelector";
import FilterForm from "../../Components/common/FilterForm";
import ActionButtons from "../../Components/common/ActionButtons";
import Button from "../../Components/common/Button";
import ReceiptIcon from "@mui/icons-material/Receipt";
import EmailIcon from "@mui/icons-material/Email";

export default function AdminPayments() {
  const [rows, setRows] = useState(5);
  const [filters, setFilters] = useState({
    paymentId: "",
    customer: "",
    status: "",
  });
  const [showFilter, setShowFilter] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const [payments, setPayments] = useState([
    {
      id: 1,
      paymentId: "PAY001",
      customer: "John Doe",
      amount: 5000,
      status: "Paid",
      date: "2025-08-28",
      method: "Credit Card",
    },
    {
      id: 2,
      paymentId: "PAY002",
      customer: "Jane Smith",
      amount: 3000,
      status: "Pending",
      date: "2025-08-27",
      method: "UPI",
    },
    {
      id: 3,
      paymentId: "PAY003",
      customer: "Alice Johnson",
      amount: 7500,
      status: "Failed",
      date: "2025-08-26",
      method: "Net Banking",
    },
  ]);

  const statusColors = {
    Paid: "bg-green-200 text-green-700",
    Pending: "bg-yellow-200 text-yellow-700",
    Failed: "bg-red-200 text-red-700",
    Refunded: "bg-blue-200 text-blue-700",
  };

  const filteredPayments = payments.filter((p) => {
    return (
      (!filters.paymentId ||
        p.paymentId.toLowerCase().includes(filters.paymentId.toLowerCase())) &&
      (!filters.customer ||
        p.customer.toLowerCase().includes(filters.customer.toLowerCase())) &&
      (!filters.status ||
        p.status.toLowerCase() === filters.status.toLowerCase())
    );
  });

  const visiblePayments = filteredPayments.slice(0, rows);

  const handleDelete = () => {
    if (confirmDeleteIndex !== null) {
      setPayments(payments.filter((_, i) => i !== confirmDeleteIndex));
      setConfirmDeleteIndex(null);
    }
  };

  const handleSavePayment = (form) => {
    if (editingPayment) {
      const updated = payments.map((p) =>
        p.id === editingPayment.id ? { ...form, id: editingPayment.id } : p
      );
      setPayments(updated);
    } else {
      setPayments([...payments, { ...form, id: Date.now() }]);
    }
    setEditingPayment(null);
    setModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-secondary">Manage Payments</h2>

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
            setEditingPayment(null);
            setModalOpen(true);
          }}
        >
          + Add Payment
        </Button>
      </div>

      {/* Filters */}
      <FilterForm
        show={showFilter}
        filters={filters}
        setFilters={setFilters}
        fields={[
          { key: "paymentId", placeholder: "Payment ID" },
          { key: "customer", placeholder: "Customer Name" },
          {
            key: "status",
            type: "select",
            placeholder: "Status",
            options: [
              { label: "Paid", value: "Paid" },
              { label: "Pending", value: "Pending" },
              { label: "Failed", value: "Failed" },
              { label: "Refunded", value: "Refunded" },
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
              <th className="p-3">Payment ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Method</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visiblePayments.map((p, i) => (
              <tr key={p.id} className="border-b hover:bg-gray-light/40">
                <td className="p-3">{p.paymentId}</td>
                <td className="p-3">{p.customer}</td>
                <td className="p-3">₹{p.amount}</td>
                <td className="p-3">
                  <button
                    onClick={() => setEditingPayment(p)}
                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                      statusColors[p.status]
                    }`}
                  >
                    {p.status}
                  </button>
                </td>
                <td className="p-3">{p.date}</td>
                <td className="p-3">{p.method}</td>
                <td className="p-3 flex justify-center gap-2">
                  {/* Default Actions */}
                  <ActionButtons
                    onEdit={() => {
                      setEditingPayment(p);
                      setModalOpen(true);
                    }}
                    onDelete={() => setConfirmDeleteIndex(i)}
                  />

                  {/* Special Actions */}
                  <button
                    onClick={() => alert("View Invoice")}
                    className="text-primary hover:text-primary-dark transition"
                  >
                    <ReceiptIcon />
                  </button>
                  <button
                    onClick={() => window.open(`mailto:${p.customer}@example.com`)}
                    className="text-secondary hover:text-secondary-dark transition"
                  >
                    <EmailIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Payment Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingPayment(null);
        }}
      >
        <h3 className="text-xl font-semibold mb-4">
          {editingPayment ? "Edit Payment" : "Add Payment"}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(
              new FormData(e.target).entries()
            );
            handleSavePayment(formData);
          }}
          className="grid gap-4"
        >
          <input
            type="text"
            name="paymentId"
            defaultValue={editingPayment?.paymentId || ""}
            placeholder="Payment ID"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="text"
            name="customer"
            defaultValue={editingPayment?.customer || ""}
            placeholder="Customer Name"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="number"
            name="amount"
            defaultValue={editingPayment?.amount || ""}
            placeholder="Amount"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <select
            name="status"
            defaultValue={editingPayment?.status || "Paid"}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          >
            {Object.keys(statusColors).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            defaultValue={editingPayment?.date || ""}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="text"
            name="method"
            defaultValue={editingPayment?.method || ""}
            placeholder="Payment Method"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <div className="flex justify-end gap-2">
            <Button type="submit" variant="primary">
              {editingPayment ? "Update" : "Add"}
            </Button>
            <Button
              type="button"
              variant="light"
              onClick={() => {
                setModalOpen(false);
                setEditingPayment(null);
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
          <span className="font-medium">
            {payments[confirmDeleteIndex]?.paymentId}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="light"
            onClick={() => setConfirmDeleteIndex(null)}
          >
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
