import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskCount: 1,
  date: "Wed Aug 10 2022",
  items: [
    {
      id: "45464524134",
      title: "Task1",
      date: "Wed Aug 10 2022",
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    deleteAllTasks: (state) => {
      state.items = [];
      state.taskCount = 0;
    },
    remove: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.taskCount -= 1;
    },
    addTask: (state, action) => {
      state.items = [...state.items, action.payload];
      state.taskCount += 1;
    },
    editTask: (state, action) => {
      const newData = state.items.find((item) => item.id === action.payload.id);
      newData.title = action.payload.title;
    },
  },
});

export const { addTask, remove, editTask, deleteAllTasks } = todoSlice.actions;

export default todoSlice.reducer;
