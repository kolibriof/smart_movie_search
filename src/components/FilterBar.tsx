import { movieGenres } from "../data/selectValues";
import { useMemo } from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchMovies, setFilterValues } from "../slices/FetchMovieSlice";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const FilterBar = () => {
	const { genre, year } = useAppSelector(
		(store) => store.movieSlice.filterValues,
	);
	const movies = useAppSelector((store) => store.movieSlice.movies);
	const filterValues = useAppSelector((store) => store.movieSlice.filterValues);

	const modal = useAppSelector((store) => store.movieSlice.ModalSettings);
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const movieYear = useMemo(() => {
		let tempArr = [""];
		let currentYear = new Date().getFullYear();
		for (let i = currentYear; i >= currentYear - 100; i--) {
			tempArr.push(i.toString());
		}
		return tempArr;
	}, []);
	const handleChosenOption = (type: "year" | "genre", i: string) => {
		dispatch(setFilterValues({ type: type, value: i }));
	};

	const handleFetchMovies = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (filterValues.genre && filterValues.year) {
			let options = {
				genre,
				year,
			};
			const formEl = document.getElementById("form-item")!;
			const form = formEl.childNodes;
			//@ts-ignore
			form.forEach((e) => e.blur());
			const result = await dispatch(fetchMovies(options));
			if (result) {
				navigate("/searchedFilms");
			}
		} else {
			toast.error("Please choose all the options!");
		}
	};
	if (movies[1 || 2 || 3].length >= 1) {
		return null;
	} else {
		return (
			<div
				className={`flex flex-col justify-center items-center h-[100%] transition-all ease-in-out duration-700 focus-within:opacity-100 z-0`}
				id='form-id'>
				<form
					id='form-item'
					className='flex items-center justify-center gap-2  bg-white bg-opacity-20 p-10 border-4 border-white border-opacity-40 rounded-lg '
					onSubmit={(e) => handleFetchMovies(e)}>
					<Autocomplete
						disablePortal
						color='white'
						id='genre-autocomplete'
						options={movieGenres}
						sx={{
							outline: 0,
							width: 300,
							border: "2px solid white",
							color: "white",
							borderRadius: "5px",
							"& .MuiOutlinedInput-notchedOutline": {
								border: "none",
							},
							"& label.Mui-focused": {
								color: "white",
							},
							"& .MuiFormLabel-root": {
								color: "white",
							},
							"& .MuiSvgIcon-root": {
								color: "white",
							},
						}}
						onInputChange={(_, newValue) =>
							handleChosenOption("genre", newValue!)
						}
						renderInput={(params) => (
							<TextField
								{...params}
								label={filterValues.genre}
								sx={{
									input: {
										color: "white",
										"&::placeholder": {
											textOverflow: "ellipsis !important",
											color: "white",
										},
									},
								}}
								className='text-white'
								placeholder='Please choose a genre...'
							/>
						)}
					/>
					<Autocomplete
						disablePortal
						color='white'
						id='genre-autocomplete'
						options={movieYear}
						sx={{
							outline: 0,
							width: 300,
							border: "2px solid white",
							color: "white",
							borderRadius: "5px",
							"& .MuiOutlinedInput-notchedOutline": {
								border: "none",
							},
							"& .MuiFormLabel-root": {
								color: "white",
							},

							"& label.Mui-focused": {
								color: "white",
							},
							"& .MuiSvgIcon-root": {
								color: "white",
							},
						}}
						onInputChange={(_, newValue) =>
							handleChosenOption("year", newValue!)
						}
						renderInput={(params) => (
							<TextField
								{...params}
								sx={{
									input: {
										color: "white",
										"&::placeholder": {
											textOverflow: "ellipsis !important",
											color: "white",
										},
									},
								}}
								label={filterValues.year}
								placeholder='Please choose a year...'
							/>
						)}
					/>

					<Button
						type='submit'
						variant='contained'
						sx={{
							boxSizing: "border-box",
							height: 60,
							color: "black",
							bgcolor: "white",
							opacity: 0.9,
							border: "2px solid white",
							":hover": {
								bgcolor: "white",
								opacity: 1,
							},
						}}>
						Search!
					</Button>
				</form>
			</div>
		);
	}
};

export default FilterBar;
