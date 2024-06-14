const registerHandler = (req, res) => {
  console.log("Reached Register Handler");
  res.render("landing/landingPage", {
    logValue: "Login",
    loginStatus: false,
    errorMessage: true,
  });
};
export { registerHandler };
