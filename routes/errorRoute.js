const express = require("express");
const router = new express.Router();

router.get("/error", (req, res, next) => {
  try {
    throw new Error("Intentional 500 Error");
  } catch (error) {
    next(error);
  }
});

module.exports = router;