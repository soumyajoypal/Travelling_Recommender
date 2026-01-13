const express = require("express");
const recommenderRouter = express.Router();
const { getRecommendations } = require("../controllers/recommenderController");
const verifyToken = require("../middleware/authMiddleware");

recommenderRouter.get("/recommendations", verifyToken, getRecommendations);
module.exports = recommenderRouter;
