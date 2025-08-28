import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function RowsSelector({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const options = [5, 10, 25, 50, 100, "All"];

  return (
    <div className="flex items-center gap-2 relative">
      {/* Label */}
      <label className="text-secondary font-medium">Rows:</label>

      {/* Dropdown Wrapper */}
      <div className="relative">
        {/* Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-between w-28 px-3 py-2 
                     bg-white border border-gray-300 rounded-xl shadow-sm 
                     text-secondary hover:border-primary focus:ring-2 
                     focus:ring-primary focus:outline-none"
        >
          {value}
          <ChevronDown
            size={18}
            className={`ml-2 transition-transform ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Dropdown Options */}
        {open && (
          <div
            className="absolute left-0 top-full mt-1 w-28 bg-white border border-gray-200 
                       rounded-xl shadow-lg z-20"
          >
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt === "All" ? Infinity : opt);
                  setOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg 
                  hover:bg-primary/10 hover:text-primary transition 
                  ${
                    value === opt
                      ? "bg-primary/20 text-primary font-semibold"
                      : "text-secondary"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
