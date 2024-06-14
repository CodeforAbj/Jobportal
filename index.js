import express from "express";
import path from "path";
import {
  landingController,
  error404,
} from "./src/controllers/generalController.js";
import expressLayouts from "express-ejs-layouts";
import { registerHandler } from "./src/controllers/userController.js";
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
console.log(path.resolve("src", "views"));
app.use(express.static("public"));
app.use(expressLayouts);

app.post("/register", registerHandler);
app.get("/", landingController);
app.get("/404", error404);

export default app;
