const jwt = require("jsonwebtoken")

exports.generateToken = (user) => {
  return jwt.sign(
    { id: user.user_id, email: user.user_email, role: user.user_level },
    process.env.JWT_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRES }
  )
}

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return null
  }
}
