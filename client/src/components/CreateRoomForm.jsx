import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Container } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function CreateRoomForm() {
  const [roomNo, setRoomNo] = useState(1);
  const [pickDate, setPickDate] = useState(dayjs("2023-11-16"));
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [promoCode, setPromoCode] = useState("");

  const handleRoomNoChange = (event) => {
    setRoomNo(event.target.value);
  };

  async function createRoom(e) {
    e.preventDefault();

    try {
      await axios.post("/createroompage", {
        roomNo,
        pickDate,
        capacity,
        price,
        promoCode,
      });
      alert("Room has been successfully created!");
      window.location.reload();
    } catch (err) {
      alert("Room creation failed! Please try again");
    }
  }

  return (
    <div>
      <form className="bg-gray-100" onSubmit={createRoom}>
        <Container className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 gap-6">
            <TextField
              id="outlined-select-pick-room-no"
              select
              label="Room No."
              defaultValue=""
              helperText="Please select your room"
              className="w-full"
              value={roomNo}
              onChange={handleRoomNoChange}
              isRequired
            >
              {[1, 2, 3, 4, 5].map((option) => (
                <MenuItem key={option} value={option}>
                  Room {option}
                </MenuItem>
              ))}
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="date picker"
                  value={pickDate}
                  onChange={(newValue) => {
                    const date = new Date(newValue);
                    if (date < new Date()) {
                      alert("Please select a future date");
                    } else {
                      setPickDate(date.toLocaleDateString("en-GB"));
                    }
                  }}
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      helperText: "DD/MM/YYYY",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
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
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 font-semibold">
                Set Promo code
              </label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 w-full"
          >
            Create Room
          </button>
        </Container>
      </form>
    </div>
  );
}
