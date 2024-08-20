import Input from "../../Components/Input/Input";
import PasswordInput from "../../Components/Input/PasswordInput";
import OTP from "../../Components/OTP/OTP";
import Button from "../../Components/Button/Button";
import TextArea from "../../Components/Input/TextArea";
// import DragDropMainPage from "../../Components/Drag And Drop/DragDropMainPage";
import EditPopup from "../../Popups/Edit/EditPopUp";
import DeletePopup from "../../Popups/Delete/DeletePopUp";
import ExampleTable from "../../Components/Table/ExampleTable";
export default function ExampleGrid() {
  return (
    <div className="bg-[#e4e3e3] min-h-screen p-4">
      <div className="grid-cols-1 border-[1.5px] border-gray-300 shadow-md rounded-md gap-4 grid p-4 bg-white">
        <Input placeholder="Normal" />
        <Input type="date" />
        <Input type="number" placeholder="Number Only" />
        {/* <Input type="file" /> */}
        <PasswordInput />
        <TextArea />
        <OTP />
        <Button />
        <EditPopup />
        <DeletePopup />
        <ExampleTable/>
        {/* <DragDropMainPage/> */}
      </div>
    </div>
  );
}
