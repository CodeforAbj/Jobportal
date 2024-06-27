import UserModel from "../model/user.model.js";
import path from "path";
import fs from "fs";
import { formatDate } from "../middlewares/setLastVisit.js";

// ====================================================== //
// =========== Function serve the landing page ========== //
// ====================================================== //
const landingController = (req, res) => {
  // Setting up the local variables for last visit display
  if (req.cookies.latestVisit) {
    res.cookie("lastVisit", req.cookies.latestVisit);
    res.locals.lastVisit = req.cookies.latestVisit; // Which was set up on last visit
  } else {
    // --------- Case of First Visit --------- //
    let date = formatDate(new Date());
    res.cookie("lastVisit", date);
    res.locals.lastVisit = date;
  }
  res.render("landing/landingPage", {
    loginStatus: undefined, // Tells Type of User Recruiter || Seeker
    errorMessage: false, // Helps in Showing errors in Registering and Landing
  });
};

// ====================================================== //
// =========== Function to handle registration ========== //
// ====================================================== //

const registerHandler = (req, res) => {
  UserModel.registerUser(req.body);
  res.render("landing/landingPage", {
    loginStatus: undefined,
    errorMessage: "success",
  });
};

// ====================================================== //
// ============== function to handle Login ============== //
// ====================================================== //

const loginHandler = (req, res) => {
  const { email, password } = req.body;
  let result = UserModel.isValidUser(email, password);
  if (result) {
    //  Choosing further actions based ontype of user  //
    // Default page for Recruiter type user is its dashboard //
    if (result.typeOfUser === "recruiter") {
      req.session.user = result.email;
      req.session.typeOfUser = result.typeOfUser;
      res.redirect("/dashboard");
    }
    // Default page for Job Seeker type user is its all jobs page //
    else if (result.typeOfUser === "seeker") {
      req.session.user = result.email;
      req.session.typeOfUser = result.typeOfUser;

      //  Tells if resume is already uploaded or not, used for easy apply  //
      req.session.resumeFlag = result.resumeFileName ? true : false;
      res.redirect("/job/all");
    }
  }
  // -- Case for failure in login attempt -- //
  else {
    res.render(`landing/landingPage`, {
      loginStatus: false,
      errorMessage: "Incorrect Email or Password",
    });
  }
};

// ====================================================== //
// ============== function to handle logout ============= //
// ====================================================== //

const logoutHandler = (req, res) => {
  // - Setting up the cookie for next visit  //

  req.session.destroy((err) => {
    if (err) {
      console.log("Error logging out", err);
      res.render("/errorPage", {
        loginStatus: 0,
      });
    }
    res.render("logout", { loginStatus: 0 });
  });
};

// ====================================================== //
// =========== function to send resume of user ========== //
// ====================================================== //

const sendResume = (req, res) => {
  const user = UserModel.getUserByEmail(req.params.user);
  if (!user.resumeFileName) {
    //  if no resume file which should be never  //
    res.status(404).render("errorPage", {
      errorMessage: "No resume file",
      loginStatus: 0,
    });
    return;
  }
  const filePath = path.resolve("public", "resumeStorage", user.resumeFileName);

  // Reading the PDF file content
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).render("errorPage", {
        errorMessage: `Error in reading Resume : ${err}`,
        loginStatus: 0,
      });
    }

    // Setting the appropriate headers for PDF response
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
  landingController,
  registerHandler,
  loginHandler,
  logoutHandler,
  sendResume,
};
