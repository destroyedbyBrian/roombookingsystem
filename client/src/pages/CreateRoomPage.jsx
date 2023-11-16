import NavBar from "../components/NavBar.jsx";
import RoomsLaunched from "../components/RoomsLaunched.jsx";
import CreateRoomForm from "../components/CreateRoomForm.jsx";

export default function CreateRoomPage() {
  return (
    <div className="flex flex-col bg-gray-100 h-fit">
      <NavBar />
      <div className="flex items-start justify-evenly mt-8 p-4 ">
        <div>
          <h2 className="text-2xl font-bold mb-4">All Room Statuses</h2>
          <RoomsLaunched className="w-full md:w-1/2 p-4 bg-white rounded shadow-md" />
        </div>
        <CreateRoomForm className="w-full md:w-1/2 p-4 bg-white rounded shadow-md" />
      </div>
    </div>
  );
}
