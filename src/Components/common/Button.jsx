export default function Button({ children, onClick, variant = "primary", className = "", ...props }) {
    const base =
      "px-4 py-2 rounded-lg shadow transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-dark",
      secondary: "bg-secondary text-white hover:bg-secondary-dark",
      danger: "bg-red-600 text-white hover:bg-red-800",
      light: "bg-gray-light hover:bg-gray/30",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    };
  
    return (
      <button
        onClick={onClick}
        className={`${base} ${variants[variant] || ""} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  