import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort",
  initialState: { sort: null },
  reducers: {
    changeSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { changeSort } = sortSlice.actions;
export default sortSlice.reducer;
