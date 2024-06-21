import UserModel from "../model/user.model.js";

const landingController = (req, res) => {
  res.render("landing/landingPage", {
    loginStatus: false,
    errorMessage: false,
    lastVisit: req.session.lastVisit,
  });
};

const logoutHandler = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error logging out", err);
      res.render("/404", { loginStatus: 0, lastVisit: req.session.lastVisit });
    }
    res.render("logout", { loginStatus: 0, lastVisit: null });
  });
};

const registerHandler = (req, res) => {
  UserModel.registerUser(req.body);
  res.render("landing/landingPage", {
    loginStatus: false,
    errorMessage: "success",
    lastVisit: req.session.lastVisit,
  });
};
const loginHandler = (req, res) => {
  const { email, password } = req.body;
  let result = UserModel.isValidUser(email, password);
  if (result) {
    req.session.lastVisit = new Date();
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
      loginStatus: false,
      errorMessage: "Incorrect Email or Password",
      lastVisit: req.session.lastVisit,
    });
  }
};

export { registerHandler, loginHandler, landingController, logoutHandler };
