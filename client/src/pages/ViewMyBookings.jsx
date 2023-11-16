import NavBar from "../components/NavBar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";

export default function ViewMyBookings() {
  const [room, setRoom] = useState([]);
  const [selectDeleteRoomId, setSelectDeleteRoomId] = useState(null);

  const storedUserName = localStorage.getItem("username");

  const buttonRef = useRef();

  const [isModalOpen, setIsModalOpen] = useState(false);

  async function modifyBooking(modifyRoomNo, modifyRoomDate, modifyId) {
    localStorage.setItem("modifyRoomNo", modifyRoomNo);
    localStorage.setItem("modifyRoomDate", modifyRoomDate);
    localStorage.setItem("modifyId", modifyId);
  }

  async function handleDeleteButton(e, roomId) {
    e.preventDefault();
    setIsModalOpen(true);
    setSelectDeleteRoomId(roomId);
  }

  async function handleConfirmDelete() {
    try {
      await axios.patch("/viewmybookings", {
        id: selectDeleteRoomId,
        roomStatus: "Available",
        bookedBy: "",
      });
      alert("Booking was successfully deleted");
      window.location.reload();
    } catch (err) {
      alert("cancellation was not successful");
    } finally {
      setIsModalOpen(false);
    }
  }

  useEffect(() => {
    axios
      .get("/viewmybookings", { params: { bookedBy: storedUserName } })
      .then((response) => {
        setRoom(response.data); // response.data is an array of room details
      })
      .catch((error) => console.error("Error:", error));
  }, [setRoom]);

  return (
    <div className="bg-gray-200 h-screen">
      <NavBar />
      {room.map((room) => (
        <div key={room.id} className="bg-gray-200 p-6">
          <Paper
            sx={{
              p: 2,
              margin: "auto",
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      {room.pickDate}, {room.startTime} - {room.endTime}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Room {room.roomNo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {room.capacity} pax
                    </Typography>
                  </Grid>
                  <Grid item className="flex justify-end gap-3">
                    <Link to="/modifybookingpage">
                      <Typography
                        sx={{ cursor: "pointer" }}
                        variant="body2"
                        ref={buttonRef}
                        onClick={() =>
                          modifyBooking(room.roomNo, room.pickDate, room.id)
                        }
                        className="bg-blue-500 text-white border rounded-md p-2 hover:bg-blue-600"
                      >
                        Modify booking
                      </Typography>
                    </Link>
                    <Typography
                      sx={{ cursor: "pointer" }}
                      variant="body2"
                      ref={buttonRef}
                      // onClick={handleDeleteButton}
                      onClick={(e) => handleDeleteButton(e, room.id)}
                      className="bg-red-500 text-white border rounded-md p-2 hover:bg-red-600"
                    >
                      Delete
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" component="div">
                    ${room.price}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        className="flex items-center justify-center outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="p-4 m-auto max-w-md flex-grow bg-white dark:bg-white rounded-lg">
          <div className="space-y-5">
            <h1 className="text-2xl font-bold">
              Are you sure you want to delete your booking?
            </h1>
            <button
              className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2"
              onClick={handleConfirmDelete}
            >
              Delete booking
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
