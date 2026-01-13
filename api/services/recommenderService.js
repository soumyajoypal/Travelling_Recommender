const axios = require("axios");

const processRecommendation = async (userId, preferences) => {
  const response = await axios.post("http://localhost:8001/recommend/content", {
    category: preferences.category,
    region: preferences.region,
    budget: preferences.budget,
    bestTime: preferences.bestTime,
  });

  return response.data;
};

module.exports = { processRecommendation };
