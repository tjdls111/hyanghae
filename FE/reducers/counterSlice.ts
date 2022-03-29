import { HYDRATE } from "next-redux-wrapper";
import { createSlice } from "@reduxjs/toolkit";

interface counterState {
  value: number;
}

const initialState: counterState = { value: 0 };

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
