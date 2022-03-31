import { HYDRATE } from "next-redux-wrapper";
import { createSlice } from "@reduxjs/toolkit";

interface authState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: authState = { isAuthenticated: true, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     console.log("HYDRATE", action.payload);
  //     return {
  //       ...state,
  //       ...action.payload,
  //     };
  //   },
  // },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
