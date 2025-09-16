export default function Toolbar({ rowsPerPage, setRowsPerPage, onAdd }) {
    return (
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Rows Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-gray-dark">Rows:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
  
        {/* Add Button */}
        <button
          onClick={onAdd}
          className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark transition"
        >
          + Add
        </button>
      </div>
    );
  }
  