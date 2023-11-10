import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Container } from "@mui/material";
import axios from "axios";
import { timeStart } from "../helpers/startTime.js";
import { timeEnd } from "../helpers/endTime.js";
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import { DataGrid } from "@mui/x-data-grid";
// import { useReducer } from "react";

// const initialStatus = { roomStatus: "locked" };

// Define reducer function
// function reducer(state, action) {
//   switch (action.type) {
//     case "launch":
//       return { roomStatus: "available" };
//     case "book":
//       return { roomStatus: "booked" };
//     default:
//       throw new Error();
//   }
// }

export default function LaunchPage() {
  // const [state, dispatch] = useReducer(reducer, initialStatus);
  const [pickDate, setPickDate] = useState(dayjs("2023-11-10"));
  const [launchStartTime, setLaunchStartTime] = useState("8am");
  const [launchEndTime, setLaunchEndTime] = useState("9am");
  const [promoCode, setPromoCode] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [rooms, setRooms] = useState([]);

  const roomStatus = "locked";

  const buttonRef = useRef();

  async function createRoom(e) {
    e.preventDefault();
    try {
      await axios.post("/launchroom", {
        pickDate,
        launchStartTime,
        launchEndTime,
        promoCode,
        price,
        capacity,
        roomStatus,
      });
      alert("Room has been successfully created!");
    } catch (err) {
      alert("Room creation failed! Please try again");
    }
  }

  async function launchRoom(roomId) {
    try {
      await axios.patch("/launchroom", {
        id: roomId, // replace roomId with the actual id of the room
        roomStatus: "Available", // replace "available" with the actual status
      });

      alert("Room has been successfully launched!");
    } catch (err) {
      alert("Room launch failed! Please try again");
    }
  }

  const handleStartTimeChange = (event) => {
    setLaunchStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setLaunchEndTime(event.target.value);
  };

  useEffect(() => {
    axios
      .get("/launchroom")
      .then((response) => {
        // response.data is an array of room details
        setRooms(response.data);
      })
      .catch((error) => console.error("Error:", error));
  }, [roomStatus]);

  return (
    <div>
      <form
        className="flex flex-col items-center bg-gray-100"
        onSubmit={createRoom}
      >
        <Container className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="date picker"
                  value={pickDate}
                  // onChange={(newValue) => setPickDate(newValue)}
                  onChange={(newValue) => {
                    const date = new Date(newValue);
                    setPickDate(date.toLocaleDateString("en-GB"));
                  }}
                  format="DD/MM/YYYY"
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              id="outlined-select-startTime"
              select
              label="Start Time"
              defaultValue="8am"
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
              defaultValue="9am"
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
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 font-semibold">
                Set Promo code
              </label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 font-semibold">
                Set Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setPrice(e.target.value);
                  }
                }}
                placeholder="Enter price"
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 font-semibold">
                Set Room Capacity
              </label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setCapacity(e.target.value);
                  }
                }}
                placeholder="Enter room capacity"
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Create Room
          </button>
        </Container>
        {/* <p>
      <strong>Status:</strong> {state.roomStatus}
      <button onClick={() => dispatch({ type: "launch" })}>launch</button>
      <button onClick={() => dispatch({ type: "book" })}>book</button>
    </p> */}
      </form>
      <div className="mt-8 grid grid-cols-5 gap-4">
        {rooms.map((room) => (
          <div key={room.id} className="bg-gray-100 p-4 rounded-lg">
            <p>
              <strong>Date</strong> {room.pickDate}
            </p>
            <p>
              <strong>Start Time:</strong> {room.launchStartTime}
            </p>
            <p>
              <strong>End Time:</strong> {room.launchEndTime}
            </p>
            <p>
              <strong>Promo Code:</strong> {room.promoCode}
            </p>
            <p>
              <strong>Price:</strong> {room.price}
            </p>
            <p>
              <strong>Capacity:</strong> {room.capacity}
            </p>
            <p>
              <strong>Status:</strong> {room.roomStatus}
            </p>
            <button
              ref={buttonRef}
              onClick={() => launchRoom(room.id)}
              className="mt-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              launch
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
