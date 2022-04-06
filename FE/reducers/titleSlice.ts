import { createSlice } from "@reduxjs/toolkit";

const titleSlice = createSlice({
  name: "title",
  initialState: { title: null },
  reducers: {
    changeTitle(state, action) {
      state.title = action.payload;
    },
  },
});

export const { changeTitle } = titleSlice.actions;
export default titleSlice.reducer;