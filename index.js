import express from "express";
import path from "path";
import { landingController } from "./src/controllers/landingController.js";
import expressLayouts from "express-ejs-layouts";
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.use(express.static("public"));
app.use(expressLayouts);
app.get("/", landingController);

export default app;
