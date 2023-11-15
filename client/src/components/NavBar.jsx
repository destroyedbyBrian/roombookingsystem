import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [role, setRole] = useState("jesus");

  const handleLogoutButton = () => {
    axios.post("/logout").then((res) => {
      console.log(res.data);
      localStorage.clear();
    });
  };

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.name) {
      localStorage.setItem("username", user.name);
    }
  }, [user]);

  const storedUserName = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get("/role", { params: { name: storedUserName } })
      .then(({ data }) => {
        if (data[0]) {
          setRole(data[0].tag);
          localStorage.setItem("role", data[0].tag);
        }
      });
  }, []);

  return (
    <div>
      <header className="flex justify-between items-center p-5 bg-white shadow-md">
        <div className="flex items-center gap-5">
          <Link to={"/index"}>
            <img
              className="object-scale-down h-16 w-16"
              src="https://uowplaybook.s3-ap-southeast-2.amazonaws.com/logo/logo-secondary.png"
            />
          </Link>
          <Link to={"/index"}>
            <button className="text-lg font-bold text-gray-700 hover:text-blue-500 transition-colors duration-200">
              Dashboard
            </button>
          </Link>
          <Link to={"/viewmybookings"}>
            <button className="text-lg font-bold text-gray-700 hover:text-blue-500 transition-colors duration-200">
              My Bookings
            </button>
          </Link>
          <Link
            to={"/createroompage"}
            className="text-blue-500 hover:text-blue-700 font-bold transition-colors duration-200"
          >
            {role === "staff" && (
              <button className="text-lg font-bold text-gray-700 hover:text-blue-500 transition-colors duration-200">
                Create Room
              </button>
            )}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="p-4 text-lg font-bold text-blue-500">
            {storedUserName}
          </span>
          <Link to={"/Logout"}>
            <button
              onClick={handleLogoutButton}
              className="text-white bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded-full shadow-md transition-colors duration-200"
            >
              Logout
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
}
