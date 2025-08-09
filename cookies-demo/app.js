const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//app.use(cookieParser());
app.use(cookies("youneedabettersecret"));

app.get("/", (req, res) => {
  console.log(req.cookies);
  // res.send(req.cookies); //all easy cookies
  res.send(req.signedCookies); //all signed cookies
});
// signed cookie
app.get("/getsignedcookies", (req, res) => {
  res.cookie("bindaas", "sachin", { signed: true });
  res.send("cokkies sent successfully");
});
// app.get("/", (req, res) => {
//   res.send("root connected");
// });

// app.get("/setcookie", (req, res) => {
//   res.cookie("mode", "dark");
//   res.cookie("location", "raya");
//   res.cookie("username", "vishal");
//   res.send("cookies send successful");
// });

// app.get("/getcookies", (req, res) => {
//   let { mode, location, username } = req.cookies;
//   res.send(`name is ${username},stay in ${location} and theme is ${mode}`);
// });
app.listen(5040, () => {
  console.log("server connexted");
});
