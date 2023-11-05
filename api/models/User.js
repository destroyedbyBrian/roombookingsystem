const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  //creates a new schema for the user document
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = mongoose.model("User", UserSchema); //creates a new model for the user document

module.exports = UserModel;
