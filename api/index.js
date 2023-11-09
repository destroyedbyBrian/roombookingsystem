const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mysql = require("mysql2/promise");

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

// creates a connection to the database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "screwthisshitS9922756G@",
  database: "roombookingsys",
});

// Create a new user document in the database
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const [rows] = await pool.query(
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
      [name, email, encryptedPassword]
    );

    res.json(rows);
  } catch (e) {
    res.status(422).json(e);
  }
});

// login a user and send back the user document if the login is successful
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    const userDoc = users[0];

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
      if (err) throw err;
      const user = await User.findOne({ where: { id: userData.id } }); // finds the user in the database
      if (user) {
        res.json({ name: user.name, email: user.email, id: user.id }); // sends the user data to the front end
      } else {
        res.json(null);
      }
    });
  } else {
    res.json(null);
  }
});

// Create room details in the database
app.post("/launchroom", async (req, res) => {
  const {
    launchStartTime,
    launchEndTime,
    promoCode,
    price,
    capacity,
    roomStatus,
  } = req.body;

  try {
    const [rows] = await pool.query(
      "INSERT INTO launch_room_details (launchStartTime, launchEndTime, promoCode, price, capacity, roomStatus ) VALUES (?, ?, ?, ?, ?, ?)",
      [launchStartTime, launchEndTime, promoCode, price, capacity, roomStatus]
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
