import express from "express";
import homepageController from "../controller/homepageController";

let router = express.Router();


let initWebRoutes = app => {
    router.get("/", homepageController.getHomePage);
    return app.use("/", router);
}

module.exports = initWebRoutes;