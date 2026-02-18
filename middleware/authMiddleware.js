const jwt = require("jsonwebtoken")

function requireAuth(req, res, next) {
  const token = req.cookies.jwt
  if (!token) return res.redirect("/login")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.redirect("/login")
  }
}

function checkRole(...roles) {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next()
    } else {
      res.status(403).send("Forbidden")
    }
  }
}

module.exports = { requireAuth, checkRole }
