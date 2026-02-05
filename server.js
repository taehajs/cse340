/******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 ******************************************/

/***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()
const path = require("path")

const app = express()

/***********************
 * View Engine and Layouts
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") 
app.set("views", path.join(__dirname, "views"))

/***********************
 * Static Files
 *************************/
app.use(express.static(path.join(__dirname, "public")))

/***********************
 * Routes
 *************************/
const inventoryRoutes = require("./routes/inventory")
app.use("/inv", inventoryRoutes)

// Index Route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" })
})

/***********************
 * Error Handling Middleware
 *************************/
app.use((req, res, next) => {
  const error = new Error("Not Found")
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render("error", {
    title: "Error",
    message: err.message || "Internal Server Error",
    status: err.status || 500,
  })
})

/***********************
 * Local Server Information
 *************************/
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

/***********************
 * Server Start
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})