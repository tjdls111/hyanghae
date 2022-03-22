import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { counter: 0 };

createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
  },
});

// const store = createStore(counterReducer);
//
// const store = configureStore();

// export type RootState = ReturnType<typeof counterReducer>;
// export default store;
