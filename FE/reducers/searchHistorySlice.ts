import { createSlice } from "@reduxjs/toolkit";

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState: { history: [] },
  reducers: {
    addHistory(state, action) {
      state.history = [...state.history, action.payload];
    },

    deleteHistory(state, action) {
      state.history = state.history.filter((item) => item !== action.payload);
    },
  },
});

export const { addHistory, deleteHistory } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
