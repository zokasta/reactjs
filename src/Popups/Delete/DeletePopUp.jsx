import { useState, Fragment } from "react";
import { addNotification } from "../../Components/Notification/Notification";
import { IconButton, Tooltip } from "@mui/material";

import Token from "../../Database/Token";

import Delete from "../../Assets/SVG/Delete";

export default function DeletePopup({
  route,
  id,
  title = "Are you sure you want to delete?",
  onLoading = () => {},
}) {
  
  const [employee, setEmployee] = useState(false);

  const deleteBooking = async () => {
    try {
      const response = await Token.delete(`${route}${id}/`);
      console.log("Response:", response);

      if (response.data.status) {
        addNotification("record deleted successfully", "Delete", "success");
        setEmployee(false);
      } else {
        addNotification("Error", response.data.message, "danger");
        console.log("Error message from server:", response.data.message);
      }
    } catch (e) {
      console.error("Error during API call:", e);
      addNotification("Error", e.message, "danger");
    } finally {
      onLoading();
    }
  };

  return (
    <Fragment>
      <Tooltip arrow placement="top" title="Details">
        <IconButton onClick={() => setEmployee(true)} className="w-min">
          <Delete />
        </IconButton>
      </Tooltip>

      <div
        className={`z-[5] w-screen h-screen fixed inset-0 flex items-center justify-center p-3 ${
          employee ? "visible" : "invisible"
        } bg-black/50`}
      >
        <div
          className={`bg-white max-w[400px] w-[400px] rounded-md shadow-2xl transition-all p-3 ${
            employee ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-2xl font-bold text-red-500">Warning</h1>
          <p className="my-3 text-lg">{title}</p>
          <button
            className="outline-none my-[3px] w-full h-10 bg-red-500 hover:bg-red-600 focus-visible:ring-2 ring-offset-2 ring-red-500 text-white text-xl rounded-md shadow-md"
            onClick={deleteBooking}
          >
            Delete
          </button>
          <button
            className="w-full h-10 rounded-sm my-2 text-lg bg-white border-[1.5px] border-dashed border-gray-400 text-gray-500 shadow-md outline-none hover:bg-orange-50 focus:bg-orange-50"
            onClick={() => setEmployee(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Fragment>
  );
}
