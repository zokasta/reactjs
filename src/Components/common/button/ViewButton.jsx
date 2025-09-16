import { useState } from "react";
import { Eye } from "lucide-react";
import Modal from "../Modal";

export default function ViewButton({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 hover:text-blue-800 transition p-2 rounded-full hover:bg-blue-100"
        title="View"
      >
        <Eye size={18} />
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Details">
        <div className="space-y-2">
          {Object.entries(data).map(([key, val]) => (
            <p key={key}>
              <span className="font-semibold">{key}: </span>
              {val}
            </p>
          ))}
        </div>
      </Modal>
    </>
  );
}
