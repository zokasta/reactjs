export default function StatusBadge({ status }) {
    const colors = {
      active: "bg-green-100 text-green-700",
      inactive: "bg-gray-100 text-gray-700",
      pending: "bg-yellow-100 text-yellow-700",
      error: "bg-red-100 text-red-700",
    };
  
    return (
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${colors[status] || "bg-gray-100 text-gray-700"}`}>
        {status}
      </span>
    );
  }
  