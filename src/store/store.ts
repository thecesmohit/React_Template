import { configureStore } from '@reduxjs/toolkit';
import getCategoriesReducer from './slices/getCategoriesSlice';
import addCategoryReducer from './slices/addCategorySlice';
import userListReducer from './slices/getUserSlice';

const store = configureStore({
  reducer: {
    getCategories: getCategoriesReducer,
    addCategory: addCategoryReducer,
    getuserList: userListReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;