require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

const jwt = require("jsonwebtoken");

const User = require("../models/user");
const ScoreData = require("../models/scoreData");
const router = express.Router();

// token session/auth checking middlewire
const isAuthenticated = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "No token, Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "jwtSecret");

    //find User
    const user = await User.findById(decoded.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user object to request for further use
    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

//connect database and directly  access collections with mongoClient
const URI = process.env.URI;

async function connectDB() {
  const client = new MongoClient(URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas via MongoClient");
    return client.db();
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error;
  }
}

//get quizquestion for contests

router.get("/quizContest", isAuthenticated, async (req, res) => {
  try {
    const db = await connectDB();
    const questions = await db.collection("question").find().toArray();
    res.json(questions);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//handle user's answers submission
router.post("/submitAnswer", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const { questionIds, selectedOptions } = req.body;
    const db = await connectDB();
    // const objectId = new ObjectId();
    
    // Check if selectedOptions is defined and is an array
    // if (!Array.isArray(selectedOptions)) {
    //   return res
    //     .status(400)
    //     .json({ message: "selectedOptions must be an array" });
    // }
    // // Trim leading and trailing whitespace from selected options
    // const trimmedSelectedOptions = selectedOptions.map((option) =>
    //   option.trim()
    // );

    // Log the request body for debugging

    // empty scoredata array
    const scoresData = [];

    // loop throw each question
    for (let i = 0; i < questionIds.length; i++) {
      const questionId = questionIds[i];
      const selectedOption = selectedOptions[i]; // Use trimmedSelectedOptions

      //fetch question from DB
      const question = await db
        .collection("question")
        .findOne({ _id: new ObjectId(questionId) });

      //check selected option is correct
      const isCorrect = question.correctAnswer === selectedOption;

      //prepare data to save "ScoreData"
      const scoreData = new ScoreData({
        userId: userId,
        // quizContestID: question.quizContestID,
        questionId: questionId,
        selectedOption: selectedOption,
        isCorrect: isCorrect,
        score: isCorrect ? 1 : 0,
        wrongAnswer: !isCorrect
          ? {
              question: question.question,
              selectedOption,
              correctAnswer: question.correctAnswer,
            }
          : null,
      });

      scoresData.push(scoreData);
    }

    await ScoreData.insertMany(scoresData);
    res.status(200).json({ message: "Answers submitted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

module.exports = router;
