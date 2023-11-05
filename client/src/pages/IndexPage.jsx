import { useState, useContext } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import ResourceCalendar from "./ResourceCalendar";

export default function IndexPage() {
  const { user } = useContext(UserContext);

  const [selected, setSelected] = useState(null);
  const defaultMonth = new Date(2023, 10);

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>{format(selected, "PP")}</p>;
  }

  return (
    <div className="flex flex-col">
      <header className="flex justify-between">
        <a href="" className="flex items-center gap-3">
          <img
            className="object-scale-down h-36 w-36"
            src="https://uowplaybook.s3-ap-southeast-2.amazonaws.com/logo/logo-secondary.png"
          />
          <button className="flex items-center font-medium text-xl">
            View Dashboard
          </button>
          <button className="flex items-center font-medium text-xl">
            My Bookings
          </button>
        </a>
        <Link
          to={"/Login"}
          className="font-bold border border-gray-200 rounded-full py-1.5 px-3 shadow-md shadow-gray-100 m-14 "
        >
          Test loginpage
        </Link>
        {!!user && <div>{user.name}</div>}
        <button className="font-bold border border-gray-200 rounded-full px-3 shadow-md shadow-gray-100 m-12 ">
          Logout
        </button>
      </header>
      <div className="flex justify-center self-center border border-gray-300 rounded-full p-1 gap-3 shadow-md shadow-gray-300 mb-10 w-1/5">
        <div className="font-medium bg-lime-700 text-white rounded-full w-10 h-7">
          Day
        </div>
        <div className="border-2 border-gray-200"></div>
        <div className="font-medium">Week</div>
        <div className="border-2 border-gray-200"></div>
        <div className="font-medium">Month</div>
        <div className="border-2 border-gray-200"></div>
        <div className="font-medium">Year</div>
      </div>
      <div className="flex flex-wrap justify-between mx-5">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          footer={footer}
          defaultMonth={defaultMonth}
          fromMonth={defaultMonth}
          toDate={new Date(2023, 12)}
        />
        <ResourceCalendar />
      </div>
    </div>
  );
}
