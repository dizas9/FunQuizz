require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

const URI = process.env.URI;

mongoose
  .connect(URI)
  .then(() => console.log("Database connection established"))
  .catch((err) => console.log(err));

app.use("/api/user", require("./Routes/AuthUser"));

app.listen(5000, () => {
  console.log("listening on 5000");
});
