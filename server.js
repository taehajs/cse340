const express = require("express");
const session = require("express-session");
const inventoryRoutes = require("./routes/inventory");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || "keyboard cat",
  resave: false,
  saveUninitialized: true
}));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(inventoryRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("errors/500", { error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
