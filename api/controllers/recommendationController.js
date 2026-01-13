const User = require("../models/userSchema");
const { processRecommendation } = require("../services/recommenderService");

getRecommendations = async (req, res) => {
  const userId = req.user.id;
  const prefs = req.body;

  await User.findByIdAndUpdate(userId, { preferences: prefs });

  const result = await processRecommendation(userId, prefs);

  return res.status(201).json({
    data: {
      recommendations: result.recommendations,
      recommenderMode: result.mode,
    },
    message: "Recommendation routing successful",
  });
};

module.exports = { getRecommendations };
