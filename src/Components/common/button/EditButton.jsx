import { useState } from "react";
import { Edit } from "lucide-react";
import Modal from "./Modal";

export default function EditButton({ data, onSave }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(data || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-green-600 hover:text-green-800 transition p-2 rounded-full hover:bg-green-100"
        title="Edit"
      >
        <Edit size={18} />
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Edit Record">
        <form onSubmit={handleSubmit} className="grid gap-4">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              type="text"
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
              placeholder={key}
            />
          ))}
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark transition"
          >
            Save
          </button>
        </form>
      </Modal>
    </>
  );
}
