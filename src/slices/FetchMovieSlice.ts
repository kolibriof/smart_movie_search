import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface FetchProps {
	year: string;
	genre: string;
	page?: number;
}

interface MovieState {
	filterValues: {
		genre: string;
		year: string;
	};
	isLoading: boolean;
	movies: {
		[key: number]: any[];
	};
	errorMessage: string;
}

const initialState: MovieState = {
	filterValues: {
		genre: "",
		year: "",
	},
	isLoading: false,
	movies: {
		1: [],
		2: [],
		3: [],
	},
	errorMessage: "",
};

export const fetchMovies = createAsyncThunk(
	"movieSlice/fetchMovies",
	async (props: FetchProps) => {
		try {
			const response = await axios.request({
				method: "GET",
				url: "https://moviesdatabase.p.rapidapi.com/titles",
				params: {
					info: "base_info",
					year: props.year,
					genre: props.genre,
					page: props.page || 1,
				},
				headers: {
					"X-RapidAPI-Key": process.env.REACT_APP_FILMS_API_KEY,
					"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
				},
			});
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
);

export const movieSlice = createSlice({
	name: "movieSlice",
	initialState,
	reducers: {
		setFilterValues: (state, action) => {
			const { type, value } = action.payload;
			switch (type) {
				case "genre":
					state.filterValues.genre = value;
					break;
				case "year":
					state.filterValues.year = value;
					break;
				default:
					break;
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchMovies.pending, (state, _) => {
				state.isLoading = true;
			})
			.addCase(fetchMovies.rejected, (state, action) => {
				state.isLoading = false;
				throw new Error(action.error.message);
			})
			.addCase(fetchMovies.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload) {
					let page = parseInt(action.payload.page);
					state.movies[page] = action.payload.results;
				} else {
					state.errorMessage = "Server issue. Please hold on.";
				}
			});
	},
});

export const { setFilterValues } = movieSlice.actions;
export default movieSlice.reducer;
