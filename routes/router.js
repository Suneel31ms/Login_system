const express = require("express");

const routes = express.Router();

const service = require("../services/render");
const controller = require("../controllers/controller");

routes.get("/register", service.register);
routes.get("/", service.login);



// API
routes.post("/register", controller.signUp);
routes.post("/login", controller.logIn);
routes.get("/dashboard", controller.dashboard);
routes.get("/logout",controller.logout);

module.exports = routes;
