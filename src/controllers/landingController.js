const landingController = (req, res) => {
  res.render("landing/landingPage", { logValue: "Login", loginStatus: false });
};

export { landingController };
