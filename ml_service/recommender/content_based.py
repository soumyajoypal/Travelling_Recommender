# recommender.py
import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_PATH = os.path.join(
    BASE_DIR,
    "..",
    "data",
    "final_destinations1.csv"
)

dest_df = pd.read_csv(DATA_PATH, encoding="cp1252")

dest_df["content_features"] = (
    dest_df["category"].astype(str) + " " +
    dest_df["Type"].astype(str) + " " +
    dest_df["region"].astype(str) + " " +
    dest_df["Zone"].astype(str) + " " +
    dest_df["budget"].astype(str) + " " +
    dest_df["best_time"].astype(str)
)

vectorizer = TfidfVectorizer(stop_words="english")
content_matrix = vectorizer.fit_transform(dest_df["content_features"])


def content_recommend(user_pref: str, top_k=10):
    user_vector = vectorizer.transform([user_pref])
    scores = cosine_similarity(user_vector, content_matrix)[0]

    dest_df["score"] = scores
    results = dest_df.sort_values(
        by="score",
        ascending=False
    ).head(top_k)

    return results[[
        "destination_id",
        "destination_name",
        "category",
        "region",
        "budget",
        "best_time",
        "score"
    ]].to_dict(orient="records")
