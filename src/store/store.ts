import { configureStore } from '@reduxjs/toolkit';
import getCategoriesReducer from './slices/getCategoriesSlice';
import addCategoryReducer from './slices/addCategorySlice';

const store = configureStore({
  reducer: {
    getCategories: getCategoriesReducer,
    addCategory: addCategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;