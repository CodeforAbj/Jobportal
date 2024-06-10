import express from "express";
import path from "path";
import {
  landingController,
  error404,
} from "./src/controllers/generalController.js";
import expressLayouts from "express-ejs-layouts";
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.use(express.static("public"));
app.use(expressLayouts);
app.get("/", landingController);
app.get("/404", error404);

export default app;
