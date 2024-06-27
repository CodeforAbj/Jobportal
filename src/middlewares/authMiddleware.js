const authMiddleware = (req, res, next) => {
  // Authenticating if its user is logged in by checking session
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};
export { authMiddleware };
