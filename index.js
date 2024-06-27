import express from "express";
import path from "path";
import methodOverride from "method-override";
import expressLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import {
  loginHandler,
  registerHandler,
  landingController,
  logoutHandler,
  sendResume,
} from "./src/controllers/userController.js";
import session from "express-session";

import {
  addJob,
  deleteJob,
  showAllJobs,
  showCreateJobForm,
  showDashboard,
  showUpdateJobFrom,
  updateJobHandler,
  showJobDetails,
  showApplyView,
  handleJobApplication,
  handleUploadResume,
  searchJobs,
} from "./src/controllers/jobController.js";

import { validateRegistrationData } from "./src/middlewares/registerFormValidation.js";
import { alreadyExistsCheck } from "./src/middlewares/registrationPrechecks.js";
import { authMiddleware } from "./src/middlewares/authMiddleware.js";
import { RedirectIfLoggedIn } from "./src/middlewares/RedirectIfLoggedIn.js";
import { upload } from "./src/middlewares/multerConfig.js";
import { setLastVisit } from "./src/middlewares/setLastVisit.js";
import { resourceBasedAuthentication } from "./src/middlewares/resourceBasedAuthentication.js";
const app = express();
app.use(cookieParser());
app.use(express.static(path.resolve("public")));

// Middleware to parse URL-encoded data sent by forms
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));

app.use(expressLayouts);

// Middleware for put and delete methods
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

// Landing Page
app.get("/", RedirectIfLoggedIn, landingController);

app.use(setLastVisit); // Last Visit Cookie must be set after initial set up

// For Registration
app.post(
  "/register",
  validateRegistrationData,
  alreadyExistsCheck,
  registerHandler
);

app.post("/login", loginHandler);

app.get("/logout", logoutHandler);

app.use(authMiddleware);
// Below this auth is necessary.

app.get("/dashboard", showDashboard);
app.get("/job/all", showAllJobs);
app.get("/job/new", showCreateJobForm);
app.post("/job/add", addJob);
app.post("/job/search", searchJobs);
app.delete("/job/delete/:jobId", resourceBasedAuthentication, deleteJob);
app.get("/job/update/:jobId", resourceBasedAuthentication, showUpdateJobFrom);
app.put("/job/update/:jobId", resourceBasedAuthentication, updateJobHandler);
app.get("/job/details/:jobId", showJobDetails);
app.get("/job/apply/:jobId", showApplyView);
app.get("/job/apply/:jobId/:user", handleJobApplication);
app.post("/applicant/upload", upload.single("resumeInput"), handleUploadResume);
app.get("/applicant/resume/:user", sendResume);
// If no route is found, handle it as a 404
app.use((req, res, next) => {
  res.status(404).render("errorPage", {
    errorMessage: "No such Page Found",
    loginStatus: 0,
  });
});
export default app;
