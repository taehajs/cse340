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
 * Index Route
 *************************/
app.get("/", (req, res) => {
  res.render("index", { title: "Home" })
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