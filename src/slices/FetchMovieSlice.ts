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
	ModalSettings: {
		opened: boolean;
		id: string;
		page: number;
	};
}

const initialState: MovieState = {
	ModalSettings: {
		opened: false,
		id: "",
		page: 1,
	},
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
		let tempArr: { [key: number]: [] } = { 1: [], 2: [], 3: [] };
		for (let i = 1; i <= 3; i++) {
			try {
				const response = await axios.request({
					method: "GET",
					url: "https://moviesdatabase.p.rapidapi.com/titles",
					params: {
						info: "base_info",
						year: props.year,
						genre: props.genre,
						page: i,
					},
					headers: {
						"X-RapidAPI-Key": process.env.REACT_APP_FILMS_API_KEY,
						"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
					},
				});
				tempArr[i] = response.data.results;
			} catch (error) {
				console.error(error);
			}
		}
		return tempArr;
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
		setModalSettings: (state, action) => {
			if (action.payload) {
				state.ModalSettings = action.payload;
			}
		},
		closeModal: (state) => {
			const el = document.getElementById("main");
			el!.style.pointerEvents = "auto";
			state.ModalSettings.opened = !state.ModalSettings.opened;
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
					if (action.payload[1 || 2 || 3].length >= 1) {
						state.errorMessage = "";
						state.movies = action.payload;
					} else {
						state.errorMessage = "Something went wrong. Please try again.";
					}
				} else {
					state.errorMessage = "Something went wrong. Please try again.";
				}
			});
	},
});

export const { setFilterValues, setModalSettings, closeModal } =
	movieSlice.actions;
export default movieSlice.reducer;
