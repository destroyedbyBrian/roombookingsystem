const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
// const User = require("./models/User.js");
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

// const User = pool.query(
//   `
// CREATE TABLE users (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(255),
//   email VARCHAR(255) UNIQUE,
//   password VARCHAR(255)
// )
// `,
//   (err) => {
//     if (err) throw err;
//     console.log("Table created successfully");
//   }
// );

// test api
app.get("/test", (req, res) => {
  res.send("test api is workingggggggg");
});

// Create a new user document in the database
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const [rows] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, encryptedPassword]
    );

    res.json(rows);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Login a user and send back the user document if the login is successful
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
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

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
