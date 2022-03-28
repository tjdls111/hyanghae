import { RootState } from "./store";
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
  // 이해가 필요한 부분
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
