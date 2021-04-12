import express from "express";
import chatBotController from "../controller/chatBotController.js";
import homepageController from "../controller/homepageController.js";

const router = express.Router();

const initWebRoutes = app => {
    router.get("/", homepageController.getHomePage);
    router.get("/webhook", chatBotController.getWebhook);
    router.post("/webhook", chatBotController.postWebhook);
}

module.exports = initWebRoutes;