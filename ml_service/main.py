from fastapi import FastAPI
from pydantic import BaseModel
from recommender.content_based import content_recommend

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
