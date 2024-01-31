import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchFavMovies } from "../slices/DisplayMoviesSlice";

const MarkedFilms = () => {
	const dispatch = useAppDispatch();
	const { currentUser } = useAppSelector((store) => store.userSlice);
	const { favMoviesDisplay, likedMoviesDisplay } = useAppSelector(
		(store) => store.displayMoviesSlice,
	);

	const [tabSelection, setTabSelection] = useState<"fav" | "liked">("fav");
	useEffect(() => {
		if (currentUser[0].favFilms && currentUser[0].likedFilms) {
			let tempSettings = {
				favMovies: currentUser[0].favFilms?.join(","),
				likedMovies: currentUser[0].likedFilms?.join(","),
			};
			dispatch(fetchFavMovies(tempSettings));
		}
	}, [currentUser[0]]);
	return (
		<motion.section className='flex flex-col w-full'>
			<motion.header className='flex flex-row w-full min-h-10 p-1'>
				<motion.div
					className='flex w-1/2 justify-center items-center bg-white text-black border-4 border-black cursor-pointer'
					onClick={() => setTabSelection("liked")}>
					LIKED FILMS
				</motion.div>
				<motion.div
					className='flex w-1/2 justify-center items-center bg-white text-black border-4 border-black cursor-pointer'
					onClick={() => setTabSelection("fav")}>
					FAVOURITE FILMS
				</motion.div>
			</motion.header>
			{tabSelection === "fav" && (
				<motion.section className='flex flex-row p-3'>
					{favMoviesDisplay &&
						favMoviesDisplay.length >= 1 &&
						favMoviesDisplay.map((i: any) => {
							return (
								<div className='flex flex-col bg-white p-3 max-w-[20%] '>
									<div className='img flex items-center justify-center flex-grow border-solid border-red-500 '>
										<img
											className='w-[90%] drop-shadow-lg '
											src={
												i.primaryImage
													? i.primaryImage.url
													: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"
											}
											alt={i.originalTitleText.text}
										/>
									</div>
									<div className='title flex font-semibold justify-center text-center text-ellipsis'>
										{i.originalTitleText.text}
									</div>
								</div>
							);
						})}
				</motion.section>
			)}
			{tabSelection === "liked" && (
				<motion.section>
					{likedMoviesDisplay.length >= 1 &&
						likedMoviesDisplay.map((i: any) => {
							return (
								<motion.div
									// onClick={() => handleModal(i.id)}
									key={i.id}
									className='flex flex-col min-w-[12%] items-center justify-center bg-white bg-opacity-70 p-3 rounded-lg drop-shadow-lg hover:scale-105 transition-all ease-out duration-300 cursor-pointer hover:z-[998] hover:drop-shadow-2xl h-[240px]'>
									<div className='img flex items-center justify-center flex-grow border-solid border-red-500 max-w-[90%]'>
										<img
											className='w-[50%] drop-shadow-lg'
											src={
												i.primaryImage
													? i.primaryImage.url
													: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"
											}
											alt={i.originalTitleText.text}
										/>
									</div>
									<div className='title flex font-semibold text-center text-ellipsis'>
										{i.originalTitleText.text}
									</div>
								</motion.div>
							);
						})}
				</motion.section>
			)}
		</motion.section>
	);
};

export default MarkedFilms;
