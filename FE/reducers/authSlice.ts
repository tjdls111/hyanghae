import { createSlice } from "@reduxjs/toolkit";
import { updateEbayKey } from "../api/perfume";
interface authState {
  isAuthenticated: boolean;
  token: string | null;
  ebayApi: string | null;
}

const initialState: authState = {
  isAuthenticated: true,
  token: null,
  ebayApi: null,
};

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
    update(state, action) {
      state.ebayApi = action.payload;
    },
  },
});

export const { login, logout, update } = authSlice.actions;
export default authSlice.reducer;
