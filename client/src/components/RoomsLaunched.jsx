import { useState, useEffect, useRef } from "react";
import axios from "axios";
// import Modal from "react-modal";

export default function RoomsLaunched() {
  const [room, setRoom] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [verificationKey, setVerificationKey] = useState("");

  const buttonRef = useRef();

  const storedUserRole = localStorage.getItem("role");

  // const handleVerificationKeyChange = (event) => {
  //   setVerificationKey(event.target.value);
  // };

  // async function launchRoom() {
  //   setIsModalOpen(true);
  // }

  // async function handleModalButton(roomId) {
  //   setIsModalOpen(true);
  //   if (verificationKey === "asd") {
  //     try {
  //       await axios.patch("/createroompage", {
  //         id: roomId,
  //         roomStatus: "Available",
  //       });
  //       alert("Room has been successfully launched!");
  //     } catch (err) {
  //       alert("Room launch failed! Please try again");
  //     }
  //   } else {
  //     alert("Wrong verification key! Please try again");
  //   }
  // }

  async function launchRoom(roomId) {
    try {
      await axios.patch("/createroompage", {
        id: roomId,
        roomStatus: "Available",
      });
      alert("Room has been successfully launched!");
    } catch (err) {
      alert("Room launch failed! Please try again");
    }
  }

  useEffect(() => {
    axios
      .get("/createroompage")
      .then((response) => {
        setRoom(response.data); // response.data is an array of room details
        // Modal.setAppElement("#root");
      })
      .catch((error) => console.error("Error:", error));
  }, [setRoom]);

  return (
    <div>
      <div className="mt-8 grid grid-cols-5 gap-4">
        {room.map((room) => (
          <div
            key={room.id}
            className="bg-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <p className="mb-2">
              <strong className="text-gray-700">Date:</strong> {room.pickDate}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Room:</strong> {room.roomNo}
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
            {room.roomStatus !== "Booked" && storedUserRole !== "staff" && (
              <button
                ref={buttonRef}
                onClick={() => launchRoom(room.id)}
                className="mt-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
              >
                {room.roomStatus === "Available" ? "Book" : "Launch"}
              </button>
            )}
          </div>
        ))}
      </div>
      {/* <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="flex items-center justify-center outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
          <label className="mb-4 text-gray-700 font-semibold block">
            Enter Verification Key to Launch room
          </label>
          <form
            className="space-y-4"
            onSubmit={() => handleModalButton(room.id)}
          >
            <input
              type="text"
              value={verificationKey}
              onChange={handleVerificationKeyChange}
              placeholder="Enter Verification Key"
              className="p-2 mb-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Launch
            </button>
          </form>
        </div>
      </Modal> */}
    </div>
  );
}

// async function launchRoom(roomId) {
//   try {
//     await axios.patch("/createroompage", {
//       id: roomId,
//       roomStatus: "Available",
//     });
//     alert("Room has been successfully launched!");
//   } catch (err) {
//     alert("Room launch failed! Please try again");
//   }
// }
