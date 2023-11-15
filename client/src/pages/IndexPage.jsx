import NavBar from "../components/NavBar";
import Filter from "../components/Filter";
import Calendar from "../components/Calendar";
import RoomsAvailable from "../components/RoomsAvailable";

export default function IndexPage() {
  const storedUserRole = localStorage.getItem("role");

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <NavBar />
      <div className="flex justify-center self-center border border-gray-300 rounded-full p-2 gap-3 shadow-md mb-10 w-1/6 mx-auto mt-8">
        <Filter />
      </div>
      <div className="flex mx-5 gap-20">
        <Calendar />
        {storedUserRole === "student" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
            <RoomsAvailable />
          </div>
        )}
      </div>
    </div>
  );
}
