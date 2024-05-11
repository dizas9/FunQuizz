const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// const verifyToken = require("../middlewires/VerifyToken");

const User = require("../models/user");

//multer file upload middleware


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "public", "images"));
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage });

//blacklist array for invlid token
const blacklistedTokens = [];

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password, gender, age, school, bio } =
    req.body;
    // const image = req.file ? req.file.filename : null;

  try {
    //check user if exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    user = new User({
      firstname,
      lastname,
      email,
      password,
      gender,
      age,
      school,
      bio,
     
    });
    //hashed password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return res
      .status(200)
      .json({ message: "Registration successful . Please Login" });
  } catch (error) {
    return res.status(500).send("server error");
  }
});

//upload image
// router.post("/imageUpload", upload.single("image"), async (req, res) => {
//   const image = req.file ? req.file.filename : null;
 

//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     // Check if the user already has a profile
//     let avater = await ProfileData.findOne({ users: user._id });

//     // If the user doesn't have a profile, create one
//     if (!avater) {
//       avater = new ProfileData({ users: user._id });
//     }
//     avater.image = image;
//     await avater.save();
//     return res.status(200).json({ message: "Image Saved" });
//   } catch (error) {
//     return res.status(500).send("Server Error: " + error.message);
//   }
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // check User exists
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    //check password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    // Generate JWT token
    const payload = {
      user: { id: user.id },
    };

    jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      return res.status(200).json({ token });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

//logout
router.post("/logout", async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    // Add the token to the blacklist
    blacklistedTokens.push(token);
    return res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

router.get("/authChecker", async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ valid: false, msg: "No token, Authorization denied" });
  }
  try {
    if (blacklistedTokens.includes(token)) {
      return res.status(401).json({ valid: false, msg: "Token revoked" });
    }
    const decoded = jwt.verify(token, "jwtSecret");

    // If token is valid, send success response
    return res.status(200).json({ valid: true, msg: "Token verified" });
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ valid: false, msg: "Invalid token" });
  }
});

module.exports = router;
