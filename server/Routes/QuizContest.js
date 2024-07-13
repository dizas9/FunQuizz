require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const express = require("express");
const { MongoClient, UUID } = require("mongodb");
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
  const { collectionName } = req.query;
  console.log(collectionName);
  try {
    const db = await connectDB();
    const questions = await db.collection(collectionName).find().toArray();

    res.json(questions);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


//get practice questions
router.get("/practice", async (req, res) => {
  const { collectionName } = req.query;
  console.log(collectionName);
  try {
    const db = await connectDB();
    const questions = await db.collection(collectionName).find().toArray();

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
    const { scores, ID } = req.body;
    const db = await connectDB();

    let userScore = new ScoreData({
      userId,
      score: scores,
      contestID: ID,
    });

    await userScore.save();

    res.status(200).json({ message: "Answers submitted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

//fetch Quiz Contest list
router.get("/contest_lists", async (req, res) => {
  console.log("its hit");
  try {
    const db = await connectDB();

    const contests = await db.listCollections({}, { nameOnly: true }).toArray();
    const targetCollection = contests
      .map((collection) => collection.name)
      .filter((name) => name.startsWith("JUL_W3"));

    //find Contest Info
    const contestsInfo = [];

    for (let i = 0; i < targetCollection.length; i++) {
      const contest = targetCollection[i];
      const collections = await db.collection(contest).find().toArray();
      const schedule = collections.map(
        ({
          month,
          date,
          day,
          hour,
          minute,
          contestID,
          DactiveMonth,
          DactiveHr,
          DactiveDate,
          DactiveDay,
        }) => ({
          collectionName: contest,
          month,
          date,
          day,
          hour,
          minute,
          DactiveMonth,
          DactiveHr,
          DactiveDate,
          DactiveDay,
          contestID,
        })
      );

      for (let j = 0; j < 1; j++) {
        const info = schedule[j];

        contestsInfo.push(info);
      }
    }

    res.status(200).json({
      schedule: contestsInfo,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/completed", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;

    const complete = await ScoreData.find({ userId });

    res.status(200).json({ complete: complete });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/score", isAuthenticated, async (req, res) => {
  const { collectionName, contestID } = req.query;

  console.log(collectionName);
  try {
    const userId = req.user.id;
    const userScore = await ScoreData.find({ userId, contestID });

    res.status(200).json({ score: userScore });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// practice quiz

router.get("/practice_lists", async (req, res) => {

  try {
    const db = await connectDB();

    const contests = await db.listCollections({}, { nameOnly: true }).toArray();
    const targetCollection = contests
      .map((collection) => collection.name)
      .filter((name) => name.includes("con0"));

    //find Contest Info
    const contestsInfo = [];

    for (let i = 0; i < targetCollection.length; i++) {
      const contest = targetCollection[i];
      const collections = await db.collection(contest).find().toArray();
      const schedule = collections.map(
        ({
          month,
          date,
          day,
          hour,
          minute,
          contestID,
          DactiveMonth,
          DactiveHr,
          DactiveDate,
          DactiveDay,
        }) => ({
          collectionName: contest,
          month,
          date,
          day,
          hour,
          minute,
          DactiveMonth,
          DactiveHr,
          DactiveDate,
          DactiveDay,
          contestID,
        })
      );

      for (let j = 0; j < 1; j++) {
        const info = schedule[j];

        contestsInfo.push(info);
      }
    }

    res.status(200).json({
      schedule: contestsInfo,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
