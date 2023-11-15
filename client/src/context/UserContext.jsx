import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (!user) {
      // If user is not logged in
      axios.get("/index").then(({ data }) => {
        // Send a GET request to /profile
        setUser(data); // Set the user state to the response data
      });
    }
  }, []); // The empty array ensures that this hook is only run once

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node,
};
