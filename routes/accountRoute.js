const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");

router.get("/account", accountController.buildAccount);

// update account Info
router.get("/account/update/:id", accountController.buildUpdate);
router.post("/account/update", accountController.updateAccount);
router.post("/account/update-password", accountController.updatePassword);



router.get("/account/logout", accountController.logout);

module.exports = router;