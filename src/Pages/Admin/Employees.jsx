import { useState } from "react";
import Modal from "../../Components/common/Modal";
import RowsSelector from "../../Components/common/RowsSelector";
import FilterForm from "../../Components/common/FilterForm";
import ActionButtons from "../../Components/common/ActionButtons";
import Button from "../../Components/common/Button";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import InfoIcon from "@mui/icons-material/Info";

export default function AdminEmployee() {
  const [rows, setRows] = useState(5);
  const [filters, setFilters] = useState({
    name: "",
    role: "",
    status: "",
  });
  const [showFilter, setShowFilter] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      role: "Manager",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 9123456780",
      role: "Developer",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+91 9988776655",
      role: "Designer",
      status: "Active",
    },
  ]);

  const statusColors = {
    Active: "bg-green-200 text-green-700",
    Inactive: "bg-red-200 text-red-700",
    OnLeave: "bg-yellow-200 text-yellow-700",
  };

  const filteredEmployees = employees.filter((emp) => {
    return (
      (!filters.name ||
        emp.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.role ||
        emp.role.toLowerCase().includes(filters.role.toLowerCase())) &&
      (!filters.status ||
        emp.status.toLowerCase() === filters.status.toLowerCase())
    );
  });

  const visibleEmployees = filteredEmployees.slice(0, rows);

  const handleDelete = () => {
    if (confirmDeleteIndex !== null) {
      setEmployees(employees.filter((_, i) => i !== confirmDeleteIndex));
      setConfirmDeleteIndex(null);
    }
  };

  const handleSaveEmployee = (form) => {
    if (editingEmployee) {
      const updated = employees.map((emp) =>
        emp.id === editingEmployee.id ? { ...form, id: editingEmployee.id } : emp
      );
      setEmployees(updated);
    } else {
      setEmployees([...employees, { ...form, id: Date.now() }]);
    }
    setEditingEmployee(null);
    setModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-secondary">Manage Employees</h2>

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
            setEditingEmployee(null);
            setModalOpen(true);
          }}
        >
          + Add Employee
        </Button>
      </div>

      {/* Filters */}
      <FilterForm
        show={showFilter}
        filters={filters}
        setFilters={setFilters}
        fields={[
          { key: "name", placeholder: "Employee Name" },
          { key: "role", placeholder: "Role" },
          {
            key: "status",
            type: "select",
            placeholder: "Status",
            options: [
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
              { label: "On Leave", value: "OnLeave" },
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
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleEmployees.map((emp, i) => (
              <tr key={emp.id} className="border-b hover:bg-gray-light/40">
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.email}</td>
                <td className="p-3">{emp.phone}</td>
                <td className="p-3">{emp.role}</td>
                <td className="p-3">
                  <button
                    onClick={() => setEditingEmployee(emp)}
                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                      statusColors[emp.status]
                    }`}
                  >
                    {emp.status}
                  </button>
                </td>
                <td className="p-3 flex justify-center gap-2">
                  {/* Default Actions */}
                  <ActionButtons
                    onEdit={() => {
                      setEditingEmployee(emp);
                      setModalOpen(true);
                    }}
                    onDelete={() => setConfirmDeleteIndex(i)}
                  />

                  {/* Special Actions */}
                  <button
                    onClick={() => window.open(`tel:${emp.phone}`)}
                    className="text-primary hover:text-primary-dark transition"
                  >
                    <CallIcon />
                  </button>
                  <button
                    onClick={() => window.open(`mailto:${emp.email}`)}
                    className="text-secondary hover:text-secondary-dark transition"
                  >
                    <EmailIcon />
                  </button>
                  <button
                    onClick={() => alert("View Details")}
                    className="text-gray-dark hover:text-gray-dark/70 transition"
                  >
                    <InfoIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Employee Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingEmployee(null);
        }}
      >
        <h3 className="text-xl font-semibold mb-4">
          {editingEmployee ? "Edit Employee" : "Add Employee"}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(
              new FormData(e.target).entries()
            );
            handleSaveEmployee(formData);
          }}
          className="grid gap-4"
        >
          <input
            type="text"
            name="name"
            defaultValue={editingEmployee?.name || ""}
            placeholder="Employee Name"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="email"
            name="email"
            defaultValue={editingEmployee?.email || ""}
            placeholder="Email"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="text"
            name="phone"
            defaultValue={editingEmployee?.phone || ""}
            placeholder="Phone"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="text"
            name="role"
            defaultValue={editingEmployee?.role || ""}
            placeholder="Role"
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <select
            name="status"
            defaultValue={editingEmployee?.status || "Active"}
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
              {editingEmployee ? "Update" : "Add"}
            </Button>
            <Button
              type="button"
              variant="light"
              onClick={() => {
                setModalOpen(false);
                setEditingEmployee(null);
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
            {employees[confirmDeleteIndex]?.name}
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
