import { useState } from "react";
import Modal from "../../Components/common/Modal";
import RowsSelector from "../../Components/common/RowsSelector";
import FilterForm from "../../Components/common/FilterForm";
import ActionButtons from "../../Components/common/ActionButtons";
import Button from "../../Components/common/Button";

export default function AdminReviews() {
  const [rows, setRows] = useState(5);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    customer: "",
    product: "",
    status: "",
  });

  const [reviews, setReviews] = useState([
    {
      id: 1,
      customer: "John Doe",
      product: "Product A",
      rating: 5,
      comment: "Excellent product!",
      date: "2025-08-28",
      status: "Published",
    },
    {
      id: 2,
      customer: "Jane Smith",
      product: "Product B",
      rating: 3,
      comment: "Average quality.",
      date: "2025-08-26",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Alice Johnson",
      product: "Product C",
      rating: 4,
      comment: "Good service.",
      date: "2025-08-25",
      status: "Published",
    },
  ]);

  const [selectedReview, setSelectedReview] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const filteredReviews = reviews.filter((rev) => {
    return (
      (!filters.customer ||
        rev.customer.toLowerCase().includes(filters.customer.toLowerCase())) &&
      (!filters.product ||
        rev.product.toLowerCase().includes(filters.product.toLowerCase())) &&
      (!filters.status ||
        rev.status.toLowerCase().includes(filters.status.toLowerCase()))
    );
  });

  const visibleReviews = filteredReviews.slice(0, rows);

  const handleDelete = () => {
    if (confirmDeleteIndex !== null) {
      setReviews(reviews.filter((_, i) => i !== confirmDeleteIndex));
      setConfirmDeleteIndex(null);
    }
  };

  const handleUpdateStatus = (status) => {
    if (selectedReview) {
      const updated = reviews.map((rev) =>
        rev.id === selectedReview.id ? { ...rev, status } : rev
      );
      setReviews(updated);
      setSelectedReview({ ...selectedReview, status });
    }
  };

  const statusColors = {
    Published: "bg-green-200 text-green-700",
    Pending: "bg-yellow-200 text-yellow-700",
    Rejected: "bg-red-200 text-red-700",
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-secondary">Manage Reviews</h2>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <Button
          variant="secondary"
          onClick={() => setShowFilter(!showFilter)}
        >
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
          { key: "customer", placeholder: "Customer Name" },
          { key: "product", placeholder: "Product Name" },
          {
            key: "status",
            type: "select",
            placeholder: "Status",
            options: [
              { label: "Published", value: "Published" },
              { label: "Pending", value: "Pending" },
              { label: "Rejected", value: "Rejected" },
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
              <th className="p-3">Customer</th>
              <th className="p-3">Product</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Comment</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleReviews.map((rev, i) => (
              <tr key={rev.id} className="border-b hover:bg-gray-light/40">
                <td className="p-3">{rev.customer}</td>
                <td className="p-3">{rev.product}</td>
                <td className="p-3">{rev.rating} ⭐</td>
                <td className="p-3">{rev.comment}</td>
                <td className="p-3">{rev.date}</td>
                <td className="p-3">
                  <button
                    onClick={() => setSelectedReview(rev)}
                    className={`px-2 py-1 rounded-md text-sm font-medium ${statusColors[rev.status]}`}
                  >
                    {rev.status}
                  </button>
                </td>
                <td className="p-3 text-center">
                  <ActionButtons
                    onEdit={() => setSelectedReview(rev)}
                    onDelete={() => setConfirmDeleteIndex(i)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={selectedReview !== null}
        onClose={() => setSelectedReview(null)}
      >
        {selectedReview && (
          <>
            <h3 className="text-xl font-semibold mb-4">Review Details</h3>
            <p>
              <span className="font-medium">Customer:</span> {selectedReview.customer}
            </p>
            <p>
              <span className="font-medium">Product:</span> {selectedReview.product}
            </p>
            <p>
              <span className="font-medium">Rating:</span> {selectedReview.rating} ⭐
            </p>
            <p>
              <span className="font-medium">Comment:</span>
            </p>
            <textarea
              value={selectedReview.comment}
              onChange={(e) =>
                setSelectedReview({ ...selectedReview, comment: e.target.value })
              }
              rows={6}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-primary outline-none resize-none"
            />
            <p className="mt-2">
              <span className="font-medium">Status:</span>
              <select
                value={selectedReview.status}
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
            <div className="flex justify-end mt-4 gap-2">
              <Button
                variant="primary"
                onClick={() => {
                  setReviews(
                    reviews.map((rev) =>
                      rev.id === selectedReview.id ? selectedReview : rev
                    )
                  );
                  setSelectedReview(null);
                }}
              >
                Save
              </Button>
              <Button variant="light" onClick={() => setSelectedReview(null)}>
                Close
              </Button>
            </div>
          </>
        )}
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
            {reviews[confirmDeleteIndex]?.customer}'s review
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
