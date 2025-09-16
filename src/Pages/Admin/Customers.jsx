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
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export default function CustomerAdmin() {
  const navigate = useNavigate();

  const [rows, setRows] = useState(5);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+911234567890",
      company: "ABC Pvt Ltd",
      address: "123 Street, City, State, 123456",
      website: "https://abc.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+911098765432",
      company: "XYZ Corp",
      address: "456 Avenue, City, State, 654321",
      website: "https://xyz.com",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+911112223334",
      company: "Acme Inc",
      address: "789 Boulevard, City, State, 789012",
      website: "https://acme.com",
    },
  ]);

  const filteredCustomers = customers.filter((c) => {
    return (
      (!filters.name ||
        c.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.email ||
        c.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.phone ||
        c.phone.toLowerCase().includes(filters.phone.toLowerCase())) &&
      (!filters.company ||
        c.company.toLowerCase().includes(filters.company.toLowerCase()))
    );
  });

  const visibleCustomers = filteredCustomers.slice(0, rows);

  const handleDelete = () => {
    if (confirmDeleteIndex !== null) {
      setCustomers(customers.filter((_, i) => i !== confirmDeleteIndex));
      setConfirmDeleteIndex(null);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-secondary">Manage Customers</h2>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <Button variant="secondary" onClick={() => setShowFilter(!showFilter)}>
          Show Filters
        </Button>
        <RowsSelector value={rows} onChange={setRows} />
      </div>

      {/* Filters */}
      <FilterForm
        show={showFilter}
        filters={filters}
        setFilters={setFilters}
        fields={[
          { key: "name", placeholder: "Customer Name" },
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
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleCustomers.map((customer, i) => (
              <tr
                key={customer.id}
                className="border-b hover:bg-gray-light/40"
              >
                <td className="p-3">{customer.name}</td>
                <td className="p-3">{customer.email}</td>
                <td className="p-3">{customer.phone}</td>
                <td className="p-3">{customer.company}</td>
                <td className="p-3 flex gap-2 justify-center flex-wrap">
                  {/* Custom Action Buttons with Icons */}
                  <ActionButtons
                    onEdit={() => setSelectedCustomer(customer)}
                    onDelete={() => setConfirmDeleteIndex(i)}
                  />

                  <button
                    onClick={() => setSelectedCustomer(customer)}
                    className="p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition text-blue-500"
                    title="Details"
                  >
                    <InfoOutlinedIcon fontSize="small" />
                  </button>
                  <button
                    onClick={() => window.open(`tel:${customer.phone}`)}
                    className="p-2 bg-green-100 rounded-md hover:bg-green-200 transition text-green-500"
                    title="Call"
                  >
                    <PhoneIcon fontSize="small" />
                  </button>
                  <button
                    onClick={() => window.open(`mailto:${customer.email}`)}
                    className="p-2 bg-purple-100 rounded-md hover:bg-purple-200 transition text-purple-500"
                    title="Email"
                  >
                    <EmailIcon fontSize="small" />
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/admin/invoice?customer_id=${customer.id}`)
                    }
                    className="p-2 bg-yellow-100 rounded-md hover:bg-yellow-200 transition text-yellow-500"
                    title="Invoices"
                  >
                    <ReceiptLongIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Details Modal */}
      <Modal
        isOpen={selectedCustomer !== null}
        onClose={() => setSelectedCustomer(null)}
      >
        <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
        {selectedCustomer && (
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {selectedCustomer.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {selectedCustomer.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {selectedCustomer.phone}
            </p>
            <p>
              <span className="font-medium">Company:</span> {selectedCustomer.company}
            </p>
            <p>
              <span className="font-medium">Address:</span> {selectedCustomer.address}
            </p>
            <p>
              <span className="font-medium">Website:</span>{" "}
              <a
                href={selectedCustomer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {selectedCustomer.website}
              </a>
            </p>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <Button variant="primary" onClick={() => setSelectedCustomer(null)}>
            Close
          </Button>
        </div>
      </Modal>

      {/* Confirmation Delete Modal */}
      <Modal
        isOpen={confirmDeleteIndex !== null}
        onClose={() => setConfirmDeleteIndex(null)}
      >
        <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
        <p className="text-gray-600 mb-6">
          Do you really want to delete{" "}
          <span className="font-medium">
            {customers[confirmDeleteIndex]?.name}
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
