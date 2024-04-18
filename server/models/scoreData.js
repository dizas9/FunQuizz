const mongoose = require("mongoose");

const scoreDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  //   quizContestID: { type: mongoose.Schema.Types.ObjectId, ref: "QuizContest" },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "question" },
  selectedOption: { type: String },
  isCorrect: { type: Boolean },
  score: { type: Number },
  wrongAnswer: {
    type: {
      question: { type: String },
      selectedOption: { type: String },
      correctAnswer: { type: String },
    },
  },
});

module.exports = mongoose.model("scores", scoreDataSchema);
