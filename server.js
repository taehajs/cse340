require("dotenv").config()
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("express-flash")

const app = express()


app.use(express.json())

app.use(express.urlencoded({ extended: true }))


app.use(cookieParser())


app.use(express.static(path.join(__dirname, "public")))


app.use(
  session({
    secret: process.env.SESSION_SECRET || "devSecret",
    resave: false,
    
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
)
app.use(flash())


app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.use("/", require("./routes/auth"))
app.use("/", require("./routes/base"))
app.use("/inv", require("./routes/inventory"))
app.use("/reviews", require("./routes/reviews"))

// 404 
app.use((req, res) => {
  res.status(404).render("error", {
    title: "404 Not Found",
    message: "Page not found",
    user: req.user 
  })
})


app.use((err, req, res, next) => {
  console.error(err)

  res.status(err.status || 500).render("error", {
    title: "Error",
    message: err.message,
    user: req.user 

  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
