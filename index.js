const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const Blog = require('./models/blog')

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

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
app.use(express.static(path.resolve('./public')))

app.get("/", async (req, res) => {

  const allBlogs = await Blog.find({})

  res.render("home", {
    user: req.user,
    blogs: allBlogs
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);


app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
