import express from "express";
import path from "path";
import methodOverride from "method-override";
import expressLayouts from "express-ejs-layouts";

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
} from "./src/controllers/jobController.js";

import { validateRegistrationData } from "./src/middlewares/registerFormValidation.js";
import { alreadyExistsCheck } from "./src/middlewares/registrationPrechecks.js";
import { authMiddleware } from "./src/middlewares/authMiddleware.js";
import { loggedInCheck } from "./src/middlewares/loggedInCheck.js";
import { upload } from "./src/middlewares/multerConfig.js";
const app = express();

app.use(express.static(path.resolve("public")));
// Middleware to parse URL-encoded data sent by forms
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));

app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.post(
  "/register",
  validateRegistrationData,
  alreadyExistsCheck,
  registerHandler
);
app.post("/login", loginHandler);
app.get("/", loggedInCheck, landingController);
app.get("/logout", logoutHandler);

app.use(authMiddleware);
// Below this auth is necessary.

// 404 Handling Middleware

app.get("/dashboard", showDashboard);
app.get("/job/all", showAllJobs);
app.get("/job/new", showCreateJobForm);
app.post("/job/add", addJob);
app.delete("/job/delete/:jobId", deleteJob);
app.get("/job/update/:jobId", showUpdateJobFrom);
app.put("/job/update/:jobId", updateJobHandler);
app.get("/job/details/:jobId", showJobDetails);
app.get("/job/apply/:jobId", showApplyView);
app.post("/job/apply/:jobId", handleJobApplication);
app.post("/applicant/upload", upload.single("resumeInput"), handleUploadResume);
app.get("/applicant/resume/:user", sendResume);
// If no route is found, handle it as a 404
app.use((req, res, next) => {
  res
    .status(404)
    .render("404", { loginStatus: 0, lastVisit: req.session.lastVisit });
});
export default app;
