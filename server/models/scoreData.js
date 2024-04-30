const mongoose = require("mongoose");

const scoreDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  // questionId: { type: mongoose.Schema.Types.ObjectId, ref: "question" },
  score: { type: Number },
  contestID: { type: String },
});

module.exports = mongoose.model("scores", scoreDataSchema);
