const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");
const connectToDb = require("./connect");
const dotenv = require("dotenv");
dotenv.config();

const PORT = 3000;

connectToDb();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
