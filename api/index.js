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
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.json("password incorrect");
      }
    } else {
      res.json("user not found");
    }
  } catch (e) {
    res.status(422).json(e);
  }
});

// Retrieve user details from the database
app.get("/profile", async (req, res) => {
  const { token } = req.cookies; // gets the jwt token from the front end

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      // verifies the jwt token
      if (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }

      // finds the user in the database
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
          res.json({ name: user.name }); // sends the user's name to the front end
        } else {
          res.json(null);
        }
      });
    });
  } else {
    res.json(null);
  }
});

// Create room details in the database
app.post("/launchroom", async (req, res) => {
  const {
    pickDate,
    launchStartTime,
    launchEndTime,
    promoCode,
    price,
    capacity,
    roomStatus,
  } = req.body;

  try {
    const [rows] = await pool.query(
      "INSERT INTO launch_room_details (pickDate, launchStartTime, launchEndTime, promoCode, price, capacity, roomStatus ) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        pickDate,
        launchStartTime,
        launchEndTime,
        promoCode,
        price,
        capacity,
        roomStatus,
      ]
    );

    res.json(rows);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Retrieve room details from the database
app.get("/launchroom", async (req, res) => {
  // const { token } = req.cookies;
  // jwt.verify(token, jwtSecret, {}, async (err, userData) => {})

  try {
    const [rows] = await pool.query("SELECT * FROM launch_room_details");
    res.json(rows);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Update room status in the database
app.patch("/launchroom", async (req, res) => {
  const { id, roomStatus } = req.body;

  try {
    const [rows] = await pool.query(
      "UPDATE launch_room_details SET roomStatus = ? WHERE id = ?",
      [roomStatus, id]
    );
    res.json(rows);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
