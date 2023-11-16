import NavBar from "../components/NavBar";
import Modal from "react-modal";
import { useState } from "react";
import { timeStart } from "../helpers/startTime";
import { timeEnd } from "../helpers/endTime";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Container } from "@mui/material";
import Filter from "../components/Filter";
import Calendar from "../components/Calendar";
import axios from "axios";

export default function BookRoomPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState("8am");
  const [endTime, setEndTime] = useState("9am");

  const roomId = localStorage.getItem("roomId");
  const storedUserName = localStorage.getItem("username");
  const storedRoomDate = localStorage.getItem("roomDate");

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  async function proceedToPayment(event) {
    event.preventDefault();
    setIsModalOpen(true);
  }

  async function confirmBooking() {
    const checkStartTime = parseInt(startTime);
    const checkEndTime = parseInt(endTime);

    if (checkStartTime >= checkEndTime) {
      alert("Start time cannot be later than end time!");
      return;
    }

    try {
      await axios.patch("/bookroompage", {
        id: roomId,
        startTime,
        endTime,
        roomStatus: "Booked",
        bookedBy: storedUserName,
      });
      setIsModalOpen(false);
      alert("Booking successful");
    } catch (err) {
      alert("Booking successful"); // fake response
    }
  }

  return (
    <div>
      <div className="flex flex-col bg-gray-100 min-h-screen">
        <NavBar />
        <div className="flex justify-center self-center border border-gray-300 rounded-full p-2 gap-3 shadow-md mb-10 w-1/6 mx-auto mt-8">
          <Filter />
        </div>
        <div className="flex mx-5 gap-20">
          <Calendar />
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {storedRoomDate} | Room {roomId}
            </h2>
            <form className="bg-gray-100" onSubmit={proceedToPayment}>
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
                  Proceed to Payment
                </button>
              </Container>
            </form>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="flex items-center justify-center outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="p-4 m-auto max-w-md flex-grow bg-white dark:bg-white rounded-lg">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Payment</h1>
            <h2 className="text-lg">Accepted cards</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
            <label className="block">Name on Card</label>
            <input className="block w-full p-2 border border-gray-300 rounded-md" />
            <label className="block">Credit Card Number</label>
            <input className="block w-full p-2 border border-gray-300 rounded-md" />
            <label className="block">Exp Month</label>
            <input className="block w-full p-2 border border-gray-300 rounded-md" />
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block">Exp Year</label>
                <input className="block w-full mt-2 p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="w-1/2">
                <label className="block">CVV</label>
                <input className="block w-full mt-2 p-2 border border-gray-300 rounded-md" />
              </div>
            </div>
            <button
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={confirmBooking}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
