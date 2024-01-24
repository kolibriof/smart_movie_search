import { nanoid } from "nanoid";
import { movieGenres } from "../data/selectValues";
import { useMemo } from "react";
import { Button, Dropdown } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchMovies, setFilterValues } from "../slices/FetchMovieSlice";
import { motion } from "framer-motion";
import InformationComponent from "./InformationComponent";

const FilterBar = () => {
	const { genre, year } = useAppSelector((store) => store.filterValues);
	const movies = useAppSelector((store) => store.movies);
	const isLoading = useAppSelector((store) => store.isLoading);
	const error = useAppSelector((store) => store.errorMessage);
	const dispatch = useAppDispatch();
	const movieYear = useMemo(() => {
		let tempArr = [""];
		let currentYear = new Date().getFullYear();
		for (let i = currentYear; i >= currentYear - 100; i--) {
			tempArr.push(i.toString());
		}
		return tempArr;
	}, []);
	const handleChosenOption = (type: string, i: string) => {
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
		return (
			<motion.div className='bg-white flex flex-row items-center bg-opacity-40 shadow-2xl w-full p-5 box-border min-h-[8%] header-appearance'>
				<motion.div className='genre w-1/2 flex'>
					<p className='font-bold text-[2em]'>{genre}</p>
				</motion.div>
				<motion.div className='year w-1/2 flex justify-end'>
					<h2 className='font-bold text-[2em]'>{year}</h2>
				</motion.div>
			</motion.div>
		);
	} else {
		return (
			<motion.div
				exit={{ opacity: 0 }}
				transition={{ duration: 500, type: "spring" }}
				className='flex justify-center items-center h-[100%] transition-all ease-in-out duration-700 focus-within:opacity-100 z-50'
				id='form-id'>
				<form
					id='form-item'
					className='flex items-center justify-center gap-2'
					onSubmit={(e) => handleFetchMovies(e)}>
					<Dropdown
						id='genre-dropdown'
						label={genre || "Select movie genre"}
						inputMode='text'
						outline={false}
						fullSized={false}
						className='overflow-y-scroll max-h-[25%] '>
						{movieGenres.map((i: any) => {
							return (
								<Dropdown.Item
									value={i}
									key={nanoid(3)}
									onClick={() => handleChosenOption("genre", i)}>
									{i}
								</Dropdown.Item>
							);
						})}
					</Dropdown>
					<Dropdown
						id='year-dropdown'
						label={year || "Choose a year"}
						className='overflow-y-scroll max-h-[25%] '
						theme={{
							content: "shadow-2xl",
						}}>
						{movieYear.map((i) => {
							return (
								<Dropdown.Item
									value={i}
									key={nanoid(3)}
									onClick={() => handleChosenOption("year", i)}>
									{i}
								</Dropdown.Item>
							);
						})}
					</Dropdown>
					<Button type='submit'>Search!</Button>
				</form>
			</motion.div>
		);
	}
};

export default FilterBar;
