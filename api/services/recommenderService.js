const User = require("../models/User");
const Review = require("../models/Review");

const processRecommendation = async (userId) => {
  const user = await User.findById(userId).lean();
  if (!user) {
    throw new Error("User not found");
  }
  const reviewCount = await Review.countDocuments({
    userId: userId,
  });

  let recommenderMode = "";
  let alpha = 0.6;
  let beta = 0.4;

  if (reviewCount === 0) {
    recommenderMode = "content_based";
    alpha = 1.0;
    beta = 0.0;
  } else if (reviewCount < 5) {
    recommenderMode = "hybrid_content_dominant";
    alpha = 0.7;
    beta = 0.3;
  } else {
    recommenderMode = "hybrid_balanced";
    alpha = 0.6;
    beta = 0.4;
  }

  const mlPayload = {
    mode: recommenderMode,
    userId: userId,
    preferences: {
      category: user.preferences?.category || null,
      region: user.preferences?.region || null,
      budget: user.preferences?.budget || null,
      bestTime: user.preferences?.bestTime || null,
    },
    reviewCount: reviewCount,
    weights: {
      alpha,
      beta,
    },
  };

  return {
    mode: recommenderMode,
    payload: mlPayload,
  };
};
