const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const seedDB = require("./seed");
const productRoutes = require("./routes/product");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

mongoose
  .connect("mongodb://127.0.0.1:27017/shopping-vishal-app")
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("DB error");
    console.log(err);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // views folder
app.use(express.static(path.join(__dirname, "public"))); // public folder
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// seeding database
//seedDB();

app.use(productRoutes); //so that harr incoming request ke liye path check kiya jaae

app.listen(8080, () => {
  console.log("server connected at port 8080");
});
