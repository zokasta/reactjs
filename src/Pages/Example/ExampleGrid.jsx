import Input from "../../Components/Input/Input";
import PasswordInput from "../../Components/Input/PasswordInput";
import OTP from "../../Components/OTP/OTP";
import Button from '../../Components/Button/Button'
export default function ExampleGrid() {
  return (
    <div className="bg-[#e4e3e3] h-screen p-4">
      <div className="grid-cols-1 border-[1.5px] border-gray-300 shadow-md rounded-md gap-4 grid p-4 bg-white">
        <Input />
        <PasswordInput />
        <OTP/>
        <Button/>
      </div>
    </div>
  );
}
