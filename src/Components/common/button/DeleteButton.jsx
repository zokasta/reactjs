import { useState } from "react";
import { Trash2 } from "lucide-react";
import Modal from "./Modal";

export default function DeleteButton({ onConfirm }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-red-600 hover:text-red-800 transition p-2 rounded-full hover:bg-red-100"
        title="Delete"
      >
        <Trash2 size={18} />
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm Delete">
        <p className="mb-6">Are you sure you want to delete this record?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg border hover:bg-gray-light transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
