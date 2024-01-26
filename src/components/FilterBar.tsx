import { movieGenres } from "../data/selectValues";
import { useMemo } from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchMovies, setFilterValues } from "../slices/FetchMovieSlice";
import { motion } from "framer-motion";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { nanoid } from "nanoid";

const FilterBar = () => {
	const { genre, year } = useAppSelector((store) => store.filterValues);
	const movies = useAppSelector((store) => store.movies);
	const modal = useAppSelector((store) => store.ModalSettings);

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

	const handleFetchMovies = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let options = {
			genre,
			year,
		};
		const wrapper = document.getElementById("form-id")!;
		const formEl = document.getElementById("form-item")!;
		wrapper.classList.replace("h-[100%]", "h-[20%]");
		wrapper.classList.add("opacity-50");
		const form = formEl.childNodes;
		//@ts-ignore
		form.forEach((e) => e.blur());
		dispatch(fetchMovies(options));
	};
	if (movies[1 || 2 || 3].length >= 1) {
		return null;
	} else {
		return (
			<motion.div
				key={nanoid(5)}
				className={`flex flex-col justify-center items-center h-[100%] transition-all ease-in-out duration-700 focus-within:opacity-100 ${
					modal.opened ? `z-0` : `z-50`
				}`}
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
								label='Genres'
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
								label='Year'
								placeholder='Please choose a genre...'
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
			</motion.div>
		);
	}
};

export default FilterBar;
