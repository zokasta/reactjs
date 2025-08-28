import { useState } from "react";
import Modal from "../../Components/common/Modal";
import Table from "../../Components/common/Table";
import ActionButtons from "../../Components/common/ActionButtons";
import Toolbar from "../../Components/common/Toolbar";
import { Star } from "lucide-react";

export default function Reviews() {
  const [reviews, setReviews] = useState([
    { reviewer: "Arjun Mehta", rating: 5, comment: "Excellent!", date: "2025-08-01" },
    { reviewer: "Sofia Khan", rating: 4, comment: "Very good", date: "2025-08-10" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ reviewer: "", rating: 0, comment: "", date: "" });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const visibleReviews = reviews.slice(0, rowsPerPage);

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold text-secondary">Manage Reviews</h2>

      <Toolbar
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        onAdd={() => setModalOpen(true)}
      />

      <Table
        headers={["Reviewer", "Rating", "Comment", "Date", "Actions"]}
        data={visibleReviews}
        renderRow={(review, i) => (
          <>
            <td className="p-3 font-medium">{review.reviewer}</td>
            <td className="p-3 flex items-center gap-1">
              {[...Array(review.rating)].map((_, idx) => (
                <Star key={idx} size={16} className="text-yellow-500 fill-yellow-500" />
              ))}
            </td>
            <td className="p-3">{review.comment}</td>
            <td className="p-3">{review.date}</td>
            <ActionButtons
              onView={() => alert("View " + i)}
              onEdit={() => alert("Edit " + i)}
              onDelete={() => alert("Delete " + i)}
            />
          </>
        )}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {/* Add/Edit Review Form */}
        <form className="grid gap-4">
          <input type="text" placeholder="Reviewer" className="border p-2 rounded-lg" />
          <input type="number" placeholder="Rating" min={1} max={5} className="border p-2 rounded-lg" />
          <textarea placeholder="Comment" className="border p-2 rounded-lg" />
          <input type="date" className="border p-2 rounded-lg" />
          <button className="bg-primary text-white px-4 py-2 rounded-lg">Save</button>
        </form>
      </Modal>
    </div>
  );
}
