require("dotenv").config()
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const flash = require("express-flash")
const session = require("express-session")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
)

app.use(flash())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use("/", require("./routes/auth"))
app.use("/", require("./routes/base"))
app.use("/inv", require("./routes/inventory"))

app.use((req, res, next) => {
  res.status(404).render("error", { message: "Not Found" })
})

app.use((err, req, res, next) => {
  res.status(500).render("error", { message: err.message })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
