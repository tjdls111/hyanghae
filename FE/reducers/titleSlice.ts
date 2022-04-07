import { createSlice } from "@reduxjs/toolkit";

const titleSlice = createSlice({
  name: "title",
  initialState: { title: null },
  reducers: {
    changeTitle(state, action) {
      state.title = action.payload;
    },
    refreshTitle(state) {
      state.title = null;
    },
  },
});

export const { changeTitle, refreshTitle } = titleSlice.actions;
export default titleSlice.reducer;
