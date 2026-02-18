const express = require("express");
const router = new express.Router();

router.get("/error", (req, res, next) => {
  const err = new Error("Intentional Server Error");
  err.status = 500;
  next(err);
});

module.exports = router;
