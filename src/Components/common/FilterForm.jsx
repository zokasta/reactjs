import { motion } from "framer-motion";
import Button from "./Button";

export default function FilterForm({
  show,
  filters,
  setFilters,
  fields,
  onClear,
  onApply,
}) {
  if (!show) return null;

  const renderField = (field) => {
    switch (field.type) {
      case "select":
        return (
          <select
            key={field.key}
            value={filters[field.key] || ""}
            onChange={(e) =>
              setFilters({ ...filters, [field.key]: e.target.value })
            }
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="">{field.placeholder}</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            key={field.key}
            placeholder={field.placeholder}
            value={filters[field.key] || ""}
            onChange={(e) =>
              setFilters({ ...filters, [field.key]: e.target.value })
            }
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none resize-none"
            rows={3}
          />
        );
      default:
        return (
          <input
            key={field.key}
            type={field.type || "text"}
            placeholder={field.placeholder}
            value={filters[field.key] || ""}
            onChange={(e) =>
              setFilters({ ...filters, [field.key]: e.target.value })
            }
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white rounded-lg shadow p-4 grid gap-4 
                 sm:grid-cols-1 md:grid-cols-2 grid-cols-3"
    >
      {fields.map((field) => renderField(field))}

      <div className="col-span-full flex justify-end gap-3">
        <Button variant="light" onClick={onClear}>
          Clear
        </Button>
        <Button variant="primary" onClick={onApply}>
          Apply
        </Button>
      </div>
    </motion.div>
  );
}
