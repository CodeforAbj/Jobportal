import express from "express";
import path from "path";
import methodOverride from "method-override";
import {
  landingController,
  error404,
  logoutHandler,
} from "./src/controllers/generalController.js";
import expressLayouts from "express-ejs-layouts";
import {
  loginHandler,
  registerHandler,
} from "./src/controllers/userController.js";
import session from "express-session";
import { validateRegistrationData } from "./src/middlewares/registerFormValidation.js";
import { alreadyExistsCheck } from "./src/middlewares/registrationPrechecks.js";
import {
  addJob,
  deleteJob,
  showAllJobs,
  showCreateJobForm,
  showDashboard,
  showUpdateJobFrom,
  updateJobHandler,
} from "./src/controllers/jobController.js";
import { authMiddleware } from "./src/middlewares/authMiddleware.js";
import { loggedInCheck } from "./src/middlewares/loggedInCheck.js";
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
app.get("/404", error404);
app.get("/logout", logoutHandler);

app.use(authMiddleware);
// Below this auth is necessary.
app.get("/dashboard", showDashboard);
app.get("/job/all", showAllJobs);
app.get("/job/new", showCreateJobForm);
app.post("/job/add", addJob);
app.delete("/job/delete/:jobId", deleteJob);
app.get("/job/update/:jobId", showUpdateJobFrom);
app.put("/job/update/:jobId", updateJobHandler);

export default app;
