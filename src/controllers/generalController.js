const landingController = (req, res) => {
  res.render("landing/landingPage", { logValue: "Login", loginStatus: false });
};

const error404 = (req, res) => {
  res.render("404", { logValue: "Oops", loginStatus: false });
};
export { landingController, error404 };
