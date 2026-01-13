const recommendService = require("../services/recommend.service");

getRecommendations = async (req, res) => {
  const userId = req.user.id;
  const result = await recommendService.processRecommendation(userId);

  return res.status(200).json({
    recommenderUsed: result.mode,
    payloadSentToML: result.payload,
    message: "Recommendation routing successful",
  });
};

module.exports = { getRecommendations };
