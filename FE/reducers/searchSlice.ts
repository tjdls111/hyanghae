import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { content: null },
  reducers: {
    submit(state, action) {
      state.content = action.payload;
    },
  },
});

export const { submit } = searchSlice.actions;
export default searchSlice.reducer;
