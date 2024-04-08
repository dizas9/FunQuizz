const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    //check user if exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    user = new User({ email, password });
    //hashed password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //jwt
    const payload = {
      user: { id: user.id },
    };
    jwt.sign(payload, "jwt-token", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      return res.json(token);
    });

    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    return res.status(500).send("server error");
  }
});

module.exports = router;
