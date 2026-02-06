const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()
const path = require("path")

const app = express()

app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") 
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))

const baseRoute = require("./routes/index")
app.use("/", baseRoute)

const inventoryRoutes = require("./routes/inventory")
app.use("/inv", inventoryRoutes)

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

const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})