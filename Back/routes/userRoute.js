const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validNewUser = require("../middleware/validateNewUser");
const User = require("../models/userModel");

router.post("/register", validNewUser, async (req, res) => {
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
        message: `User ${req.body.firstName} ${req.body.surName} created`
    })
  } catch (err) {
    return res.status(400).json({
      message: "this account is already exists",
    });
  }
});

module.exports = router;
