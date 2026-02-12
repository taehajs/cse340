const jwt = require("jsonwebtoken")

function requireAuth(req, res, next) {
  const token = req.cookies.jwt
  if (!token) return res.redirect("/account/login")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.redirect("/account/login")
  }
}

function checkRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next()
    } else {
      res.status(403).send("Forbidden")
    }
  }
}

module.exports = { requireAuth, checkRole }
