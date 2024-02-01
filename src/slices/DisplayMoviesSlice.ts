import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface FetchMoviesProps {
	favMovies: string;
	likedMovies: string;
}

interface initialStateProps {
	favMoviesDisplay: any[];
	likedMoviesDisplay: any[];
}

const initialState: initialStateProps = {
	favMoviesDisplay: [],
	likedMoviesDisplay: [],
};

export const fetchFavMovies = createAsyncThunk(
	"displayMoviesSlice/fetchFavMovies",
	async (settings: FetchMoviesProps) => {
		const options = {
			method: "GET",
			url: "https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids",
			params: {
				idsList: settings.favMovies,
			},
			headers: {
				"X-RapidAPI-Key": "cad0ebd204mshcf5d9b42bf42294p1d2375jsnee6c5bc84412",
				"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
			},
		};

		try {
			const response = await axios.request(options);
			if (response) {
				return response.data.results;
			}
		} catch (error) {
			console.error(error);
		}
	},
);
export const fetchLikedMovies = createAsyncThunk(
	"displayMoviesSlice/fetchLikedMovies",
	async (settings: FetchMoviesProps) => {
		const options = {
			method: "GET",
			url: "https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids",
			params: {
				idsList: settings.likedMovies,
			},
			headers: {
				"X-RapidAPI-Key": "cad0ebd204mshcf5d9b42bf42294p1d2375jsnee6c5bc84412",
				"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
			},
		};

		try {
			const response = await axios.request(options);
			if (response) {
				return response.data.results;
			}
		} catch (error) {
			console.error(error);
		}
	},
);

export const displayMoviesSlice = createSlice({
	name: "displayMoviesSlice",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchFavMovies.fulfilled, (state, action) => {
				state.favMoviesDisplay = action.payload;
			})

			.addCase(fetchLikedMovies.fulfilled, (state, action) => {
				state.likedMoviesDisplay = action.payload;
			});
	},
});

// export const {} = displayMoviesSlice.actions;
export default displayMoviesSlice.reducer;
