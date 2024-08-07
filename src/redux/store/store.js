import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from '../slice/taskSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
