require("dotenv").config();
import express from "express";
import viewEngine from "./configs/viewEngine.js";
import initWebRoute from "./routes/web.js";
import bodyParser from "body-parser";

const app = express();

// config view engine
viewEngine(app);
// use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlenucoded({ extended: true }));
// init all web routes
initWebRoute(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("App is running on ${port}");
})