const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')

const userRoute = require("./routes/user");
const connectToDb = require("./connect");
const dotenv = require("dotenv");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
dotenv.config();

const PORT = 3000;

connectToDb();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

app.get("/", (req, res) => {
  res.render("home", {
    user: req.user
  });
});

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
