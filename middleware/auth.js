const { verifyToken } = require("../utilities/jwtUtils")

exports.checkAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) return res.redirect("/login")

  const user = verifyToken(token)
  if (!user) return res.redirect("/login")

  req.user = user
  next()
}

exports.checkAdmin = (req, res, next) => {
  if (req.user.role === "Employee" || req.user.role === "Admin") return next()
  return res.status(403).send("Not allowed")
}
