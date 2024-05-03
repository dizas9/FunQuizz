require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5000",
      "http://localhost:4173",
      "https://fun-quizz-server.vercel.app",
      "https://funquizz.vercel.app",
      "https://funquizz.onrender.com",
    ],
    credentials: true,
  })
);

const URI = process.env.URI;

mongoose
  .connect(URI)
  .then(() => console.log("Database connection established"))
  .catch((err) => console.log(err));

app.use("/public/images", express.static("Routes/public/images"));
app.use("/api/user", require("./Routes/AuthUser"));
app.use("/api/account", require("./Routes/Account"));
app.use("/api/quiz", require("./Routes/QuizContest"));

app.listen(5000, () => {
  console.log("listening on 5000");
});
