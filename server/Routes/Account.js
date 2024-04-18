//user Account Details / Score

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.get("/profile", async (req, res) => {
  // get token
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "No token, Authorization denied" });
  }

  try {
    //If there is token then verify
    const decoded = jwt.verify(token, "jwtSecret");

    //find User
    const user = await User.findById(decoded.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user profile
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
