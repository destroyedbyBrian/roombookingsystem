const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mysql = require("mysql2/promise");
const { v4: uuidv4 } = require("uuid");

app.use(express.json()); // allows the server to read json from the front end
app.use(cookieParser()); // allows the server to read cookies from the front end

const encrypted = bcrypt.genSaltSync(10); // number of times the password is encrypted
const jwtSecret = "na8q94h5o23i4nrjsdfn"; // secret key for jwt

app.use(
  cors({
    credentials: true, // allows cookies to be sent from the front end to the server
    origin: "http://localhost:5173", // location of the react app that is allowed to connect to the server
  })
);

// Creates a connection to the database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "screwthisshitS9922756G@",
  database: "roombookingsys",
});

// Create a new user document in the database
app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  let studentId;
  let staffId;

  try {
    const encryptedPassword = bcrypt.hashSync(password, 10);
    if (role === "student") {
      studentId = "STU" + uuidv4();
      const [rows] = await pool.query(
        "INSERT INTO Student (name, email, password, studentId) VALUES (?, ?, ?, ?)",
        [name, email, encryptedPassword, studentId]
      );
      res.json(rows);
    } else if (role === "staff") {
      staffId = "STF" + uuidv4();
      const [rows] = await pool.query(
        "INSERT INTO Staff (name, email, password, staffId) VALUES (?, ?, ?, ?)",
        [name, email, encryptedPassword, staffId]
      );
      res.json(rows);
    } else {
      return res.status(400).send({ message: "Invalid role" });
    }
  } catch (e) {
    res.status(422).json(e);
  }
});

// Login a user and send back the user document if the login is successful
app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let userDoc;

    if (role === "student") {
      const [users] = await pool.query(
        "SELECT * FROM Student WHERE email = ?",
        [email]
      );
      userDoc = users[0];
    } else if (role === "staff") {
      const [users] = await pool.query("SELECT * FROM Staff WHERE email = ?", [
        email,
      ]);
      userDoc = users[0];
    }

    if (userDoc) {
      const passwordCorrect = bcrypt.compareSync(password, userDoc.password);

      if (passwordCorrect) {
        jwt.sign(
          { email: userDoc.email, id: userDoc.id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) {
              res.status(500).json({ message: "Error signing token" });
              return;
            }
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(422).json(e);
  }
});

// Logout a user by deleting the cookie
app.post("/logout", async (_, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

// Retrieve user details from the database
app.get("/index", async (req, res) => {
  const { token } = req.cookies; // gets the jwt token from the front end

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
      const query =
        "SELECT * FROM Student UNION SELECT * FROM Staff WHERE staffId = ?";
      const values = [userData.staffId];
      pool.query(query, values, (err, results) => {
        if (err) {
          res.status(500).json({ message: "Error querying the database" });
          return;
        }
        if (results.length > 0) {
          const user = results[0];
          res.json({ name: user.name });
        } else {
          res.json(null);
        }
      });
    });
  } else {
    res.json(null);
  }
});

app.get("/role", async (req, res) => {
  const { name } = req.query;

  try {
    const [rows] = await pool.query(
      "SELECT tag FROM Staff WHERE name = ? UNION SELECT tag FROM Student WHERE name = ?",
      [name, name]
    );
    res.json(rows);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Create room feature
app.post("/createroompage", async (req, res) => {
  const { roomNo, pickDate, capacity, price, promoCode } = req.body;

  try {
    const [rows] = await pool.query(
      "INSERT INTO RoomDetails (roomNo, pickDate, capacity, price,promoCode) VALUES (?, ?, ?, ?, ?)",
      [roomNo, pickDate, capacity, price, promoCode]
    );
    res.json(rows);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Retrieve created room's details from the database
app.get("/createroompage", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM RoomDetails");
    res.json(rows);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Retrieve created room's details from the database
app.get("/bookroompage", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM RoomDetails");
    res.json(rows);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Lauch room feature
app.patch("/createroompage", async (req, res) => {
  const { id, roomStatus } = req.body;

  try {
    const [rows] = await pool.query(
      "UPDATE RoomDetails SET roomStatus = ? WHERE id = ?",
      [roomStatus, id]
    );
    res.json(rows);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Grab all launched rooms to display on the main page
app.get("/indexpage", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM RoomDetails WHERE roomStatus = 'Available' "
    );
    res.json(rows);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Book room feature
app.patch("/bookroompage", async (req, res) => {
  const { id, startTime, endTime, roomStatus, bookedBy } = req.body;

  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      res.status(401).json({ message: "Invalid token" });
      return;
    } else {
      try {
        const [rows] = await pool.query(
          "UPDATE RoomDetails SET startTime = ?, endTime = ?, roomStatus = ?, bookedBy = ? WHERE id = ?",
          [startTime, endTime, roomStatus, bookedBy, id]
        );
        res.json(rows);
      } catch (e) {
        res.status(422).json(e);
      }
    }
  });
});

// Grab all booked rooms from the database
app.get("/bookedpage", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM RoomDetails WHERE roomStatus = 'Booked' "
    );
    res.json(rows);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Grab bookings by user for View my bookings page
app.get("/viewmybookings", async (req, res) => {
  const { bookedBy } = req.query;
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      res.status(401).json({ message: "Invalid token" });
      return;
    } else {
      try {
        const [rows] = await pool.query(
          "SELECT * FROM RoomDetails WHERE bookedBy = ?",
          [bookedBy]
        );
        res.json(rows);
      } catch (e) {
        res.status(422).json(e);
      }
    }
  });
});

// Modify booked room feature
app.patch("/modifybookingpage", async (req, res) => {
  const { id, startTime, endTime } = req.body;

  try {
    const [rows] = await pool.query(
      "UPDATE RoomDetails SET startTime = ?, endTime = ? WHERE id = ?",
      [startTime, endTime, id]
    );
    res.json(rows);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Delete booking feature
app.patch("/viewmybookings", async (req, res) => {
  const { id, roomStatus, bookedBy } = req.body;

  console.log(req.body); // Log the request body

  try {
    // Check if the id exists in the RoomDetails table
    const [existingRows] = await pool.query(
      "SELECT * FROM RoomDetails WHERE id = ?",
      [id]
    );
    if (existingRows.length === 0) {
      return res
        .status(404)
        .json({ message: "No booking found with the provided id." });
    }

    const [rows] = await pool.query(
      "UPDATE RoomDetails SET roomStatus = ?, bookedBy = ? WHERE id = ?",
      [roomStatus, bookedBy, id]
    );
    res.json(rows);
  } catch (e) {
    console.log(e); // Log the error
    res.status(422).json(e);
  }
});

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
