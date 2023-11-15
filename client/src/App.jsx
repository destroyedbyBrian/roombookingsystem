import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Signup from "./pages/SignupPage.jsx";
import CreateRoomPage from "./pages/CreateRoomPage.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import axios from "axios";
import RoomsBooked from "./components/RoomsBooked.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import ViewMyBookings from "./pages/ViewMyBookings.jsx";
import BookRoomPage from "./pages/BookRoomPage.jsx";
import ModifyBookingPage from "./pages/ModifyBookingPage.jsx";
import UserRole from "./components/UserRole.jsx";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createroompage" element={<CreateRoomPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/bookedpage" element={<RoomsBooked />} />
        <Route path="/viewmybookings" element={<ViewMyBookings />} />
        <Route path="/bookroompage" element={<BookRoomPage />} />
        <Route path="/modifybookingpage" element={<ModifyBookingPage />} />
        <Route path="/role" element={<UserRole />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
