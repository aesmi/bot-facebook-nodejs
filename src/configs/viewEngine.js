import express from "express";

/*
Config view engine for node app
 */

const viewEngine = app => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
};

module.exports = viewEngine;