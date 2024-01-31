import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slices/FetchMovieSlice";
import userSlice from "./slices/FetchUserSlice";
import displayMoviesSlice from "./slices/DisplayMoviesSlice";

export const store = configureStore({
	reducer: {
		movieSlice,
		userSlice,
		displayMoviesSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
