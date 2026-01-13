import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../utils/apiRequest";

// --------------------
// Initial State
// --------------------
const initialState = {
  recommendations: [],
  status: "idle",
  error: null,
};

// --------------------
// Thunk
// --------------------
export const fetchRecommendations = createAsyncThunk(
  "recommender/fetchRecommendations",
  async (preferences, { rejectWithValue }) => {
    try {
      const response = await apiRequest.post("/recommendations", preferences);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch recommendations"
      );
    }
  }
);

// --------------------
// Slice
// --------------------
const recommenderSlice = createSlice({
  name: "recommender",
  initialState,
  reducers: {
    clearRecommendations(state) {
      state.recommendations = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recommendations = action.payload.recommendations;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearRecommendations } = recommenderSlice.actions;
export default recommenderSlice.reducer;
