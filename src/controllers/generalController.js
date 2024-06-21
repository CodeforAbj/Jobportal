const landingController = (req, res) => {
  res.render("landing/landingPage", {
    loginStatus: false,
    errorMessage: false,
    lastVisit: req.session.lastVisit,
  });
};

const error404 = (req, res) => {
  res.render("404", { loginStatus: 0, lastVisit: req.session.lastVisit });
};

const logoutHandler = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error logging out", err);
      res.redirect("/404");
    }
    res.render("logout", { loginStatus: 0, lastVisit: null });
  });
};
export { landingController, error404, logoutHandler };
