import { useContext } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function IndexPage() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <header className="flex justify-between">
        <a href="" className="flex items-center gap-3">
          <img
            className="object-scale-down h-15 w-40"
            src="https://uowplaybook.s3-ap-southeast-2.amazonaws.com/logo/logo-secondary.png"
          />
          <button className="flex items-center font-semibold text-xl">
            View Dashboard
          </button>
          <button className="flex items-center font-semibold text-xl">
            My Bookings
          </button>
        </a>
        <Link
          to={"/Login"}
          className="font-bold border border-gray-200 rounded-full py-1.5 px-3 shadow-md shadow-gray-100 m-9 "
        >
          Test loginpage
        </Link>
        {!!user && <div>{user.name}</div>}
        <button className="font-bold border border-gray-200 rounded-full py-1.5 px-3 shadow-md shadow-gray-100 m-9 ">
          Logout
        </button>
      </header>
      <div className="flex border border-gray-300 rounded-full p-2 gap-3 shadow-md shadow-gray-300">
        <div className="bg-primary font-medium text-white p1 rounded-full w-10 h-7">
          Day
        </div>
        <div className="border-l border-gray-300"></div>
        <div>Week</div>
        <div className="border-l border-gray-300"></div>
        <div>Month</div>
        <div className="border-l border-gray-300"></div>
        <div>Year</div>
      </div>
    </div>
  );
}
