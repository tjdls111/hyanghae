import { createSlice } from "@reduxjs/toolkit";

interface searchItem {
  created_at: string;
  searchWord: string;
}

const initialState: searchItem[] = [];

const sortByDate = function (a: searchItem, b: searchItem) {
  const res =
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  return res;
};

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState,
  reducers: {
    addHistory(state, action) {
      return [action.payload, ...state];
    },
    deleteLastHistory(state) {
      return state.slice(0, -1);
    },
    deleteItem(state, action) {
      return state.filter((item) => item.created_at !== action.payload);
    },
    deleteEntireHistory(state) {
      return [];
    },
  },
});

export const {
  addHistory,
  deleteLastHistory,
  deleteItem,
  deleteEntireHistory,
} = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
