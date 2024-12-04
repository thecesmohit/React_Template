import { configureStore } from '@reduxjs/toolkit'
import errorPageSlice from './ErrorPageSlice'

export const store = configureStore({
  reducer: {
    errorPage: errorPageSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch