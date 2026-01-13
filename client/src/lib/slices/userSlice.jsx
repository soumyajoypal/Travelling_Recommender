import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiRequest from "../util/apiRequest";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiRequest.post("/auth/login", credentials);

      const user = response.data.data;
      const token = response.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message || { message: "Login failed" }
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiRequest.post("/auth/register", credentials);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message || { message: "Registration failed" }
      );
    }
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || action.error.message;
      })

      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || action.error.message;
      })

      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || action.error.message;
      });
  },
});
export const { clearError } = userSlice.actions;
export default userSlice.reducer;
