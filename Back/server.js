const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
dotenv.config({
  path: "./config.env",
});

const secret = process.env.COOKIE_PASS;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to DB"));

app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);

app.listen(8000, () => console.log("listening on port 8000"));

module.exports = secret;
