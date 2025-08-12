const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const seedDB = require("./seed");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");

const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/review");
const authRoutes = require("./routes/auth");

mongoose
  .connect("mongodb://127.0.0.1:27017/shopping-vishal-app")
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("DB error");
    console.log(err);
  });

//session
let configsession = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true, // ✅ spelling fix
  cookie: {
    httpOnly: true,
    expires: Date.now() + 24 * 7 * 60 * 60 * 1000,
    maxAge: 24 * 7 * 60 * 60 * 1000,
  },
};

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // views folder
app.use(express.static(path.join(__dirname, "public"))); // public folder
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session(configsession));
app.use(flash());
// passport vaali
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// PASSPORT WAALI
passport.use(new LocalStrategy(User.authenticate()));

// seeding database
//seedDB();

app.use(productRoutes); //so that harr incoming request ke liye path check kiya jaae
app.use(reviewRoutes);
app.use(authRoutes);

app.listen(5030, () => {
  console.log("server connected at port 5030");
});

// Bhai, flash basically ek middleware hai jo Express me temporary messages store karke next request me show karne ke kaam aata hai.

// Simple Explanation
// Kabhi tu koi form submit karta hai (e.g. signup, login, product create) aur tu user ko “Success” ya “Error” message dikhana chahta hai.

// Ye message sirf ek request ke liye hota hai (refresh ke baad chala jata hai).

// Flash messages session me store hote hain aur ek hi baar render hone ke baad delete ho jate hain.
