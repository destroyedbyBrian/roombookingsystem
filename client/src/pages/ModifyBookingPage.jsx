import Filter from "../components/Filter";
import Calendar from "../components/Calendar";
import NavBar from "../components/NavBar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Container } from "@mui/material";
import { timeStart } from "../helpers/startTime";
import { timeEnd } from "../helpers/endTime";
import { useState } from "react";
import axios from "axios";

export default function ModifyBookingPage() {
  const [startTime, setStartTime] = useState("8am");
  const [endTime, setEndTime] = useState("9am");

  const modifyRoomNo = localStorage.getItem("modifyRoomNo");
  const modifyRoomDate = localStorage.getItem("modifyRoomDate");
  const modifyRoomId = localStorage.getItem("modifyId");

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  async function confirmEdit() {
    const checkStartTime = parseInt(startTime);
    const checkEndTime = parseInt(endTime);

    if (checkStartTime >= checkEndTime) {
      alert("Start time cannot be later than end time!");
      return;
    }

    try {
      await axios.patch("/modifybookingpage", {
        id: modifyRoomId,
        startTime,
        endTime,
      });
      alert("Edit successful");
    } catch (err) {
      alert("Edit was not successful");
    }
  }

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <NavBar />
      <div className="flex justify-center self-center border border-gray-300 rounded-full p-2 gap-3 shadow-md mb-10 w-1/6 mx-auto mt-8">
        <Filter />
      </div>
      <div className="flex mx-5 gap-20">
        <Calendar />
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {modifyRoomDate} | Room {modifyRoomNo}
          </h2>
          <form className="bg-gray-100" onSubmit={confirmEdit}>
            <Container className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 gap-6">
                <TextField
                  id="outlined-select-startTime"
                  select
                  label="Start Time"
                  defaultValue="08:00"
                  helperText="Please select your start time"
                  className="w-full"
                  onChange={handleStartTimeChange}
                >
                  {timeStart.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-select-endTime"
                  select
                  label="End Time"
                  defaultValue="09:00"
                  helperText="Please select your end time"
                  className="w-full"
                  onChange={handleEndTimeChange}
                >
                  {timeEnd.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <div className="flex flex-col">
                  <label className="mb-2 text-gray-700 font-semibold">
                    Enter Promo code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 50OFF"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-10 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 w-full"
              >
                Confirm Edit
              </button>
            </Container>
          </form>
        </div>
      </div>
    </div>
  );
}
