const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validNewUser = require("../middleware/validateNewUser");
const User = require("../models/userModel");
const validUser = require("../middleware/validateUser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

const secret = process.env.COOKIE_PASS;

router.post("/signup", validNewUser, async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  try {
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      surName: req.body.surName,
      birthDate: req.body.birthDate,
    });
    res.status(201).json({
      message: `User ${req.body.firstName} ${req.body.surName} created`,
    });
  } catch (err) {
    return res.status(400).json({
      message: "this account is already exists",
    });
  }
});

router.post("/login", validUser, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const token = jwt.sign({ id: user._id }, secret);
  res.cookie("jwt", token, { httpOnly: true, secure: false });
  res.json({
    message: "your cookie",
  });
});

router.get("/", async (req, res) => {
  const data = jwt.verify(req.cookies.jwt, secret);
  const users = await User.find();
  try {
    data;
    res.json({
      message: "request accepted",
      users,
    });
  } catch (err) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
});

module.exports = router;
