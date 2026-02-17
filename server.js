const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const pool = require("./database");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const inventoryRoute = require("./routes/inventoryRoute");
const errorRoute = require("./routes/errorRoute");

app.use("/inv", inventoryRoute);
app.use("/", errorRoute);

// 404
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    title: "Error",
    message: err.message || "Internal Server Error"
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});