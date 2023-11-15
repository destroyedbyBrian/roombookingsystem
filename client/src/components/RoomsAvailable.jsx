import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RoomsAvailable() {
  const [room, setRoom] = useState([]);

  const buttonRef = useRef();

  async function redirectBookingPage(roomId, roomDate) {
    localStorage.setItem("roomId", roomId);
    localStorage.setItem("roomDate", roomDate);
  }

  useEffect(() => {
    axios
      .get("/indexpage")
      .then((response) => {
        setRoom(response.data); // response.data is an array of room details
      })
      .catch((error) => console.error("Error:", error));
  }, [setRoom]);

  return (
    <div>
      <div className="mt-8 grid grid-cols-4 gap-8">
        {room.map((room) => (
          <div
            key={room.id}
            className="bg-zinc-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <p className="mb-2">
              <strong className="text-gray-700">Date:</strong> {room.pickDate}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Start Time:</strong>{" "}
              {room.startTime}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">End Time:</strong>{" "}
              {room.endTime}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Capacity:</strong>{" "}
              {room.capacity}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Promo Code:</strong>{" "}
              {room.promoCode}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Price:</strong> {room.price}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Status:</strong>{" "}
              {room.roomStatus}
            </p>
            <Link to={"/bookroompage"}>
              <button
                ref={buttonRef}
                onClick={() => {
                  redirectBookingPage(room.id, room.pickDate);
                }}
                className="mt-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
              >
                {room.roomStatus === "Available" ? "Book" : "Launch"}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
