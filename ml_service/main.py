from fastapi import FastAPI
from pydantic import BaseModel
from recommender.content_based import content_recommend
from recommender.hybrid import hybrid_recommend

app = FastAPI(title="Travel Recommender ML Service")

class RecommendationRequest(BaseModel):
    category: str = "city"
    region: str = "delhi"
    budget: str = "medium"
    type: str = "park"
    zone: str = "northern"
    bestTime: str = "nov-feb"

@app.post("/recommend/content")
def recommend_content(req: RecommendationRequest):
    user_pref = " ".join([
        req.category,
        req.region,
        req.budget,
        req.bestTime,
        req.type,
        req.zone
    ])

    recommendations = content_recommend(user_pref)

    return {
        "mode": "content_based",
        "recommendations": recommendations
    }


@app.post("/recommend/hybrid")
def recommend_hybrid(req: RecommendationRequest):
    user_pref = " ".join([
        req.category,
        req.region,
        req.budget,
        req.bestTime,
        req.travelType,
        req.zone
    ])

    return {
        "mode": "hybrid",
        "recommendations": hybrid_recommend(
            user_pref=user_pref,
            user_id=req.userId
        )
    }