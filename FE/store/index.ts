import { createStore } from "redux";

const counterReducer = (
  state: { counter: number } = { counter: 0 },
  action: any
) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }

  if (action.type === "increase") {
    return {
      counter: state.counter + action.amount,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export type RootState = ReturnType<typeof counterReducer>;
export default store;
