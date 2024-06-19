import express from "express";
import path from "path";
import {
  landingController,
  error404,
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
  showAllJobs,
  showCreateJobForm,
  showDashboard,
} from "./src/controllers/jobController.js";
const app = express();

// Middleware to parse URL-encoded data sent by forms
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));

app.use(express.static("public"));
app.use(expressLayouts);
app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.post(
  "/register",
  validateRegistrationData,
  alreadyExistsCheck,
  registerHandler
);
app.post("/login", loginHandler);
app.get("/", landingController);
app.get("/404", error404);
app.get("/dashboard", showDashboard);
app.get("/job/all", showAllJobs);
app.get("/job/new", showCreateJobForm);
app.post("/job/add", addJob);
export default app;
