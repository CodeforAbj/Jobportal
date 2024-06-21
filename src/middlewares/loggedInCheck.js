const loggedInCheck = (req, res, next) => {
  if (req.session.user) {
    req.session.lastVisit = new Date();
    res.redirect("/dashboard");
  } else {
    next();
  }
};
export { loggedInCheck };
