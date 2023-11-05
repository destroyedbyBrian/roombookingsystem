const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(express.json()); //allows the server to read json from the front end
app.use(cookieParser()); //allows the server to read cookies from the front end

const encrypted = bcrypt.genSaltSync(10); //number of times the password is encrypted
const jwtSecret = "na8q94h5o23i4nrjsdfn"; //secret key for jwt

app.use(
  cors({
    credentials: true, //allows cookies to be sent from the front end to the server
    origin: "http://localhost:5173", //location of the react app that is allowed to connect to the server
  })
);

mongoose.connect(process.env.MONGO_URL); //connects to the mongodb database

app.get("/test", (req, res) => {
  res.send("test api is really really working");
});

//Create a new user document in the mongodb database
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body; //body is the data that is sent from the front end

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, encrypted), //encrypts the password
    });

    res.json(userDoc); //sends the user document back to the front end if document creation is successful
  } catch (e) {
    res.status(422).json(e);
  }
});

//Login a user and send back the user document if the login is successful
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email }); //finds the user document in the database
  if (userDoc) {
    const passwordCorrect = bcrypt.compareSync(password, userDoc.password); //compares the password from the front end to the password in the database
    if (passwordCorrect) {
      jwt.sign(
        //creates a jwt token
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc); //sends the jwt token to the front end
        }
      );
    } else {
      res.json("password incorrect");
    }
  } else {
    res.json("user not found");
  }
});

//Retrieve user details from the database
app.get("/profile", (req, res) => {
  const { token } = req.cookies; //gets the jwt token from the front end
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      //verifies the jwt token
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id); //finds the user document in the database
      res.json({ name, email, _id }); //sends the user document to the front end
    });
  } else {
    res.json(null);
  }
});

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
