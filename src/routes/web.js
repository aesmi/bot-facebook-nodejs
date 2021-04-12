import express from "express";
import chatBotController from "../controller/chatBotController";
import homepageController from "../controller/homepageController";

let router = express.Router();

let initWebRoutes = app => {
    router.get("/", homepageController.getHomePage);
    router.get("/webhook", chatBotController.getWebhook);
    router.post("/webhook", chatBotController.postWebhook);
}

module.exports = initWebRoutes;