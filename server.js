require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");
const utilities = require("./utilities");


const inventoryRouter = require("./routes/inventory");

const app = express();
const PORT = process.env.PORT || 10000;


app.use(
  session({
    secret: process.env.SESSION_SECRET || "somesecretkey",
    resave: false,
    saveUninitialized: true,
  })
);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  try {
    const nav = await utilities.buildNav();
    res.render("home", { title: "Home", nav });
  } catch (err) {
    next(err);
  }
});


app.use("/inventory", inventoryRouter);

// 404
app.use(async (req, res) => {
  const nav = await utilities.buildNav();
  res.status(404).render("error", {
    title: "Page Not Found",
    nav,
    message: "The page you are looking for does not exist.",
  });
});

// 500 
app.use(async (err, req, res, next) => {
  console.error(err);
  const nav = await utilities.buildNav();
  res.status(500).render("error", {
    title: "Server Error",
    nav,
    message: err.message || "An unexpected error occurred. Please try again later.",
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
