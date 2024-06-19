import UserModel from "../model/user.model.js";

const registerHandler = (req, res) => {
  UserModel.registerUser(req.body);
  res.render("landing/landingPage", {
    logValue: "Login",
    loginStatus: false,
    errorMessage: "success",
  });
};
const loginHandler = (req, res) => {
  const { email, password } = req.body;
  let result = UserModel.isValidUser(email, password);
  if (result) {
    if (result.typeOfUser === "recruiter") {
      req.session.user = result.email;
      req.session.typeOfUser = result.typeOfUser;
      res.redirect("/dashboard");
    } else if (result.typeOfUser === "seeker") {
      req.session.user = result.email;
      req.session.typeOfUser = result.typeOfUser;
      res.redirect("/job/all");
    }
  } else {
    res.render(`landing/landingPage`, {
      logValue: "Log In",
      loginStatus: false,
      errorMessage: "Incorrect Email or Password",
    });
  }
};

export { registerHandler, loginHandler };
