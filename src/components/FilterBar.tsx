import { nanoid } from "nanoid";
import { movieGenres } from "../data/selectValues";
import { useMemo } from "react";
import { Button, Dropdown } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchMovies, setFilterValues } from "../slices/FetchMovieSlice";

const FilterBar = () => {
	const { genre, year } = useAppSelector((store) => store.filterValues);
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
		wrapper.classList.replace("h-[100%]", "h-[25%]");
		wrapper.classList.add("opacity-50");
		const form = formEl.childNodes;
		//@ts-ignore
		form.forEach((e) => e.blur());
		dispatch(fetchMovies(options));
	};
	return (
		<div
			className='flex justify-center items-center h-[100%] transition-all ease-in-out duration-700 focus-within:opacity-100'
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
		</div>
	);
};

export default FilterBar;
