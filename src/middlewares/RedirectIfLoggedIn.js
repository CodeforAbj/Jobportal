const RedirectIfLoggedIn = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};
export { RedirectIfLoggedIn };
