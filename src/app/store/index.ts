import {configureStore} from "@reduxjs/toolkit";
import {postSlice} from "@/entities/post/slice";

export const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
