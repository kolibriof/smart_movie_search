import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slices/FetchMovieSlice";

export const store = configureStore({
	reducer: movieSlice,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
