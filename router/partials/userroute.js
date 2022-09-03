const express = require("express")

const userrouter = express.Router()
const controller = require("../../app/controller")


userrouter.get("/", controller.api.v1.userController.Tes)
userrouter.get("/users", controller.api.v1.userController.authentication, controller.api.v1.userController.handleGetUsers)
userrouter.get("/user", controller.api.v1.userController.authentication, controller.api.v1.userController.handleGetUser)

userrouter.post("/login", controller.api.v1.userController.handleLoginUser)
userrouter.post("/register", controller.api.v1.userController.handleRegisterUser)

module.exports = userrouter