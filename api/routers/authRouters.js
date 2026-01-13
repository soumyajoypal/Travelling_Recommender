const express = require("express");
const authRouter = express.Router();
const { loginUser, registerUser } = require("../controllers/authController");

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);

module.exports = authRouter;
