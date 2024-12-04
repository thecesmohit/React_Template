import { configureStore } from '@reduxjs/toolkit';
import getUserReducer from './slices/getUserSlice';
import addCategoryReducer from './slices/addUserSlice';
import deleteUserReducer from './slices/deleteUserSlice';
import addUserReducer from './slices/addUserSlice';

const store = configureStore({
  reducer: {
    getUsers: getUserReducer,
    addUser: addUserReducer,
    deleteUser: deleteUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;