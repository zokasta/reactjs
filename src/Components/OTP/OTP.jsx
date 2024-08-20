import { useState, useRef, useEffect } from "react";

export default function OTP({ length = 6, onPinSubmit = () => {} }) {
  const [pin, setPin] = useState(new Array(length).fill(""));
  const inputRef = useRef([]);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newPin = [...pin];
    newPin[index] = value.substring(value.length - 1);
    setPin(newPin);
    const joinData = newPin.join("");

    if (value && index < length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }

    if (value && index === length - 1) {
      onPinSubmit(joinData);
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !pin[index] &&
      index > 0 &&
      inputRef.current[index - 1]
    ) {
      inputRef.current[index - 1].focus();
    }
  };
  return (
    <div className="flex justify-center">
      <div>
        {pin.map((value, index) => {
          return (
            <input
              key={index}
              type="number"
              value={value}
              ref={(input) => (inputRef.current[index] = input)}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 outline-orange-500 border-gray-200 rounded-sm mx-[1.5px] text-center border-[2px] float-left w-12 text-lg"
            />
          );
        })}
      </div>
    </div>
  );
}
