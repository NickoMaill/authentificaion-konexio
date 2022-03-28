const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    maxlength: 100,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    maxlength: 50,
    required: true,
  },
  surName: {
    type: String,
    maxlength: 50,
    required: true,
  },
  birthDate: {
    day: {
      type: Number,
      min: 1,
      max: 31,
      required: true,
    },
    month: {
      type: String,
      maxlength: 10,
      required: true,
    },
    year: {
      type: Number,
      min: 1940,
      max: 2022,
      required: true,
    },
  },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
