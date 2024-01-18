import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface FetchProps {
	year: string;
	genre: string;
}

interface MovieState {
	filterValues: {
		genre: string;
		year: string;
	};
	isLoading: boolean;
	movies: any[];
}

const initialState: MovieState = {
	filterValues: {
		genre: "",
		year: "",
	},
	isLoading: false,
	movies: [],
};

export const fetchMovies = createAsyncThunk(
	"movieSlice/fetchMovies",
	async (props: FetchProps) => {
		const options = {
			method: "GET",
			url: "https://moviesdatabase.p.rapidapi.com/titles",
			params: {
				info: "base_info",
				year: props.year,
				genre: props.genre,
			},
			headers: {
				"X-RapidAPI-Key": "cad0ebd204mshcf5d9b42bf42294p1d2375jsnee6c5bc84412",
				"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
			},
		};

		try {
			const response = await axios.request(options);
			return response.data.results;
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
				state.movies = action.payload;
				console.log(state.movies);
			});
	},
});

export const { setFilterValues } = movieSlice.actions;
export default movieSlice.reducer;
