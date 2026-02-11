function checkAccountType(req, res, next) {
  if (res.locals.accountData && 
     (res.locals.accountData.account_type == 'Employee' || res.locals.accountData.account_type == 'Admin')) {
    next();
  } else {
    req.flash("notice", "You do not have permission.");
    return res.redirect("/account/login");
  }
}

module.exports = checkAccountType;
