import UserModel from "../model/user.model.js";
import path from "path";
import fs from "fs";

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
    //last visit cookies
    let lastVisit;
    if (req.cookies.lastVisit) {
      lastVisit = new Date(req.cookies.lastVisit); // Parse cookie value as date
    } else {
      lastVisit = new Date(); // Set lastVisit to current date if cookie doesn't exist
    }
    req.session.lastVisit = lastVisit;
    if (result.typeOfUser === "recruiter") {
      req.session.user = result.email;

      req.session.typeOfUser = result.typeOfUser;
      res.redirect("/dashboard");
    } else if (result.typeOfUser === "seeker") {
      req.session.user = result.email;
      req.session.typeOfUser = result.typeOfUser;
      req.session.resumeFlag = result.resumeFileName ? true : false;
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

const sendResume = (req, res) => {
  const user = UserModel.getUserByEmail(req.params.user);
  if (!user.resumeFileName) {
    // if no resume file which should be never
    res
      .status(404)
      .render("404", { loginStatus: 0, lastVisit: req.session.lastVisit });
    return;
  }
  const filePath = path.resolve("public", "resumeStorage", user.resumeFileName);

  // Read the PDF file content
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res
        .status(404)
        .render("404", { loginStatus: 0, lastVisit: req.session.lastVisit });
    }

    // Set appropriate headers for PDF response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${user.resumeFileName}`
    );

    // Send the PDF data to the client
    res.send(data);
  });
};
export {
  registerHandler,
  loginHandler,
  landingController,
  logoutHandler,
  sendResume,
};
