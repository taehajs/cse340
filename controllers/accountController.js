const accountModel = require("../models/accountModel");
const bcrypt = require("bcryptjs");

async function buildAccount(req, res) {
  res.render("account/management", { title: "Account Management" });
}


async function buildUpdate(req, res) {
  const accountId = req.params.id;
  const account = await accountModel.getAccountById(accountId);
  res.render("account/update", { title: "Update Account", account });
}

async function updateAccount(req, res) {
  const { account_id, account_firstname, account_lastname, account_email } = req.body;
  const result = await accountModel.updateAccount(account_id, account_firstname, account_lastname, account_email);
  if (result) {
    req.flash("notice", "Account updated.");
    res.redirect("/account");
  } else {
    req.flash("notice", "Update failed.");
    res.redirect("/account/update/" + account_id);
  }

}



async function updatePassword(req, res) {
  const { account_id, account_password } = req.body;
  const hashedPassword = await bcrypt.hash(account_password, 10);
  const result = await accountModel.updatePassword(account_id, hashedPassword);
  if (result) {
    req.flash("notice", "Password updated.");
    res.redirect("/account");
  } else {
    req.flash("notice", "Password update failed.");
    res.redirect("/account/update/" + account_id);
  }


  
}



function logout(req, res) {
  res.clearCookie("jwt");
  res.redirect("/");
}

module.exports = { buildAccount, buildUpdate, updateAccount, updatePassword, logout };