import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [role, setRole] = useState("");

  const { setUser } = useContext(UserContext);

  async function LoginUser(e) {
    e.preventDefault(); // prevents page from refreshing
    try {
      const { data } = await axios.post("/login", { email, password, role }); // Sends a POST request to /login
      setUser(data);
      alert("Login successful");
      setRedirect(true); // Redirect to homepage
    } catch (err) {
      alert("Login failed! Please try again");
    }
  }

  if (redirect) {
    return <Navigate to={"/index"} />; // Redirect to homepage
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <img
        className="object-scale-down h-30 w-80 flex mx-auto"
        src="https://uowplaybook.s3-ap-southeast-2.amazonaws.com/logo/logo-secondary.png"
      />
      <div className="container mx-auto flex-grow flex items-center justify-evenly flex-row mb-20">
        <div className="bg-zinc-50 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 flex">Welcome back!</h1>
          <h2 className="flex font-semibold mt-7 mb-7">
            Enter your credentials to access your account
          </h2>
          <form onSubmit={LoginUser}>
            <h3 className="flex text-sm font-medium -mb-1">Email address</h3>
            <input
              className="w-full border border-gray-200 my-2 py-1.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h3 className="flex text-sm font-medium -mb-1 mt-2">Password</h3>
            <input
              className="w-full border border-gray-200 my-2 py-1.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex mt-4">
              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="student" className="mr-4">
                Student
              </label>
              <input
                type="radio"
                id="staff"
                name="role"
                value="staff"
                checked={role === "staff"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="staff">Staff</label>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-12 py-2 px-4 rounded-xl w-full">
              Login
            </button>
            <div className="mt-2 flex justify-center gap-1">
              Don&apos;t have an account?{" "}
              <Link
                to={"/Signup"}
                className="text-blue-500 hover:text-blue-700"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
        <div>
          <img
            className="object-cover h-full w-96 rounded-xl"
            src="https://images.unsplash.com/photo-1503149779833-1de50ebe5f8a?auto=format&fit=crop&q=60&w=1400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBsYW50c3xlbnwwfHwwfHx8MA%3D%3D"
          />
        </div>
      </div>
    </div>
  );
}
