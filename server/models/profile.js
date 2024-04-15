const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  users: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  image: { type: String },
  age: { type: String },
  school: { type: String },
  bio: { type: String },
});

module.exports = mongoose.model("profileData", ProfileSchema);
