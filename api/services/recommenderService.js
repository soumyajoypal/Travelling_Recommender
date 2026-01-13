const axios = require("axios");
const Review = require("../models/reviewsSchema");

const processRecommendation = async (userId, preferences) => {
  const reviewCount = await Review.countDocuments({ userId });
  const isColdStart = reviewCount === 0;
  const endpoint = isColdStart ? "/recommend/content" : "/recommend/hybrid";

  const response = await axios.post(`http://localhost:8001${endpoint}`, {
    ...preferences,
    userId: isColdStart ? null : userId,
  });
  return response.data;
};

module.exports = { processRecommendation };
