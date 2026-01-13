# recommender/hybrid.py
import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DEST_PATH = os.path.join(
    BASE_DIR, "..", "data", "final_destinations1.csv"
)

REVIEWS_PATH = os.path.join(
    BASE_DIR, "..", "data" , "reviews.csv"
)


dest_df = pd.read_csv(DEST_PATH, encoding="cp1252")
reviews = pd.read_csv(REVIEWS_PATH, encoding="cp1252")


dest_df["content_features"] = (
    dest_df["category"].astype(str) + " " +
    dest_df["Type"].astype(str) + " " +
    dest_df["region"].astype(str) + " " +
    dest_df["Zone"].astype(str) + " " +
    dest_df["budget"].astype(str) + " " +
    dest_df["best_time"].astype(str) + " " +
    dest_df["popularity"].astype(str)
)

vectorizer = TfidfVectorizer(stop_words="english")
content_matrix = vectorizer.fit_transform(dest_df["content_features"])


def hybrid_recommend(
    user_pref: str,
    user_id: str,
    alpha: float = 0.6,
    beta: float = 0.4,
    top_k: int = 10
):

    user_vector = vectorizer.transform([user_pref])
    content_scores = cosine_similarity(
        user_vector, content_matrix
    )[0]

    dest_df["content_score"] = content_scores

    user_item_matrix = reviews.pivot_table(
        index="UserID",
        columns="destination_id",
        values="Rating",
        fill_value=0
    )
    
    if user_id not in user_item_matrix.index:
        dest_df["hybrid_score"] = dest_df["content_score"]
        return (
            dest_df.sort_values("hybrid_score", ascending=False)
            .head(top_k)
            .to_dict(orient="records")
        )

    user_similarity = cosine_similarity(user_item_matrix)
    user_similarity_df = pd.DataFrame(
        user_similarity,
        index=user_item_matrix.index,
        columns=user_item_matrix.index
    )

    similar_users = (
        user_similarity_df[user_id]
        .sort_values(ascending=False)
        .iloc[1:6]
    )

    unrated = user_item_matrix.loc[user_id] == 0

    collab_scores = (
        user_item_matrix
        .loc[similar_users.index, unrated]
        .mean()
    )

    dest_df["collab_score"] = dest_df["destination_id"].map(
        collab_scores
    ).fillna(0)

    dest_df["hybrid_score"] = (
        alpha * dest_df["content_score"] +
        beta * dest_df["collab_score"]
    )
    
    return (
        dest_df.sort_values("hybrid_score", ascending=False)
        .head(top_k)[[
            "destination_id",
            "destination_name",
            "category",
            "Type",
            "region",
            "Zone",
            "budget",
            "best_time",
            "hybrid_score"
        ]]
        .to_dict(orient="records")
    )
