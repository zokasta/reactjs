import { useState } from "react";

export default function Input({
  defaultValue = "",
  type = "text",
  className = "",
  placeholder = "",
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <input
      type={type}
      className={`w-full h-10 bg-[#f4f6f8] border-[1px] border-gray-300 rounded-sm outline-none focus:border-orange-500 px-2 focus:border-[1.75px] ${className}`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  );
}
