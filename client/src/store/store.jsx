import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../lib/slices/userSlice";
import recommenderReducer from "../lib/slices/recommenderSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    recommender: recommenderReducer,
  },
});

export default store;
