import { useState } from "react";
import Button from "../../Components/common/Button";
import RowsSelector from "../../Components/common/RowsSelector";
import FilterForm from "../../Components/common/FilterForm";
import Modal from "../../Components/common/Modal";
import ActionButtons from "../../Components/common/ActionButtons";
import ToggleSwitch from "../../Components/common/ToggleSwitch";

export default function AdminTaxes() {
  const [rows, setRows] = useState(5);
  const [filters, setFilters] = useState({
    country: "",
    name: "",
    rate: "",
    type: "",
    active: "",
  });
  const [showFilter, setShowFilter] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const [form, setForm] = useState({
    country: "",
    name: "",
    rate: "",
    type: "",
    active: true,
  });

  const [taxes, setTaxes] = useState([
    { country: "India", name: "GST", rate: 18, type: "Indirect", active: true },
    {
      country: "USA",
      name: "Sales Tax",
      rate: 7,
      type: "Indirect",
      active: false,
    },
    { country: "UK", name: "VAT", rate: 20, type: "Indirect", active: true },
    {
      country: "Germany",
      name: "MwSt",
      rate: 19,
      type: "Indirect",
      active: true,
    },
  ]);

  const filteredTaxes = taxes.filter((tax) => {
    return (
      (!filters.country ||
        tax.country.toLowerCase().includes(filters.country.toLowerCase())) &&
      (!filters.name ||
        tax.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.rate || String(tax.rate) === String(filters.rate)) &&
      (!filters.type ||
        tax.type.toLowerCase().includes(filters.type.toLowerCase())) &&
      (!filters.active || String(tax.active) === filters.active)
    );
  });

  const visibleTaxes = filteredTaxes.slice(0, rows);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...taxes];
      updated[editingIndex] = form;
      setTaxes(updated);
    } else {
      setTaxes([...taxes, form]);
    }
    setForm({ country: "", name: "", rate: "", type: "", active: true });
    setEditingIndex(null);
    setModalOpen(false);
  };

  const handleEdit = (index) => {
    setForm(taxes[index]);
    setEditingIndex(index);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (confirmDeleteIndex !== null) {
      setTaxes(taxes.filter((_, i) => i !== confirmDeleteIndex));
      setConfirmDeleteIndex(null);
    }
  };

  const handleToggleActive = (index) => {
    const updated = [...taxes];
    updated[index].active = !updated[index].active;
    setTaxes(updated);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-secondary">Manage Taxes</h2>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <Button variant="secondary" onClick={() => setShowFilter(!showFilter)}>
          Show Filters
        </Button>
        <RowsSelector value={rows} onChange={setRows} />
        <Button
          variant="primary"
          onClick={() => {
            setEditingIndex(null);
            setForm({
              country: "",
              name: "",
              rate: "",
              type: "",
              active: true,
            });
            setModalOpen(true);
          }}
        >
          + Add Tax
        </Button>
      </div>

      {/* Filters */}
      <FilterForm
        show={showFilter}
        filters={filters}
        setFilters={setFilters}
        fields={[
          { key: "country", placeholder: "Country" },
          { key: "name", placeholder: "Tax Name" },
          { key: "rate", type: "number", placeholder: "Rate (%)" },
          {
            key: "type",
            type: "select",
            placeholder: "Type",
            options: [
              { label: "VAT", value: "vat" },
              { label: "GST", value: "gst" },
              { label: "Sales", value: "sales" },
            ],
          },
        ]}
        onClear={() => setFilters({})}
        onApply={() => setShowFilter(false)}
      />

      {/* ✅ Table with Dummy Data */}
      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-light text-gray-dark">
              <th className="p-3">Country</th>
              <th className="p-3">Tax Name</th>
              <th className="p-3">Rate (%)</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleTaxes.map((tax, i) => (
              <tr key={i} className="border-b hover:bg-gray-light/40">
                <td className="p-3">{tax.country}</td>
                <td className="p-3">{tax.name}</td>
                <td className="p-3">{tax.rate}%</td>
                <td className="p-3">{tax.type}</td>
                <td className="p-3">
                  <ToggleSwitch
                    checked={tax.active}
                    onChange={() => handleToggleActive(i)}
                    color="primary"
                  />
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

      {/* ✅ Modal for Add/Edit */}
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

          {/* ✅ Active / Inactive Toggle */}
          <label className="flex items-center gap-3">
            <span className="text-gray-700">Active:</span>
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
          </label>

          <Button type="submit" variant="primary">
            {editingIndex !== null ? "Update Tax" : "Add Tax"}
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
          <span className="font-medium">{taxes[confirmDeleteIndex]?.name}</span>
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
