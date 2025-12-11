import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser, googleLogin, googleLogout } from "../Thunk/AuthThunk";

const initialState = {
  user: null,
  token: null,
  status: "idle",
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    }
  },
  extraReducers: (builder) => {
    builder
      // ---------- Register ----------
      .addCase(registerUser.pending, (state) => { state.status = "loading"; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // ---------- Login ----------
      .addCase(loginUser.pending, (state) => { state.status = "loading"; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // ---------- Logout ----------
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = "idle";
      })

      // ---------- Google Login ----------
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = "succeeded";
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // ---------- Google Logout ----------
      .addCase(googleLogout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = "idle";
      });
  }
});

export const { resetAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
