const express = require("express");
const recommenderRouter = express.Router();
const {
  getRecommendations,
} = require("../controllers/recommendationController");
const verifyToken = require("../middleware/authMiddleware");

recommenderRouter.post("/", verifyToken, getRecommendations);
module.exports = recommenderRouter;
