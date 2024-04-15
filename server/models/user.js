const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: { type: "string", required: true },
  lastname: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  image: { type: String },
  age: { type: String },
  gender: { type: String },
  school: { type: String },
  bio: { type: String },
});

module.exports = mongoose.model("users", UserSchema);
