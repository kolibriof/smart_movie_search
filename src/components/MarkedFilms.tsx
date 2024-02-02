import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { useAppSelector } from "../hooks";
import MarkedMovies from "./UserMovies/MoviesBlock";
import { HeaderContext } from "../context/AppContext";
import { nanoid } from "nanoid";

const MarkedFilms = () => {
	const { favMoviesDisplay, likedMoviesDisplay } = useAppSelector(
		(store) => store.displayMoviesSlice,
	);
	const [tabSelection, setTabSelection] = useState<"fav" | "liked">("fav");
	const { RefreshMarkedMovies } = useContext(HeaderContext);
	return (
		<section className='flex flex-col w-full pt-2 pb-2'>
			<header className='flex flex-row w-[95%] self-center min-h-10 p-1 '>
				<div
					className={`flex w-1/2 justify-center items-center rounded-sm ${
						tabSelection === "liked"
							? `bg-black text-white`
							: `bg-white text-black`
					} text-black border-4 border-black cursor-pointer`}
					onClick={() => setTabSelection("liked")}>
					LIKED FILMS
				</div>
				<div
					className={`flex w-1/2 justify-center items-center rounded-sm  ${
						tabSelection === "fav"
							? `bg-black text-white`
							: `bg-white text-black`
					}  border-4 border-black cursor-pointer`}
					onClick={() => setTabSelection("fav")}>
					FAVOURITE FILMS
				</div>
			</header>
			<AnimatePresence mode='wait'>
				<motion.div className='flex justify-center pt-4' key={nanoid(9)}>
					{tabSelection === "fav" ? (
						<motion.div
							key={"fav"}
							className='grid grid-cols-4 min-w-full justify-items-center'>
							{favMoviesDisplay && favMoviesDisplay.length >= 1 && (
								<MarkedMovies movies={favMoviesDisplay} type={tabSelection} />
							)}
						</motion.div>
					) : (
						<motion.div
							key={"liked"}
							className='grid grid-cols-4 min-w-full justify-items-center '>
							{likedMoviesDisplay && likedMoviesDisplay.length >= 1 && (
								<MarkedMovies movies={likedMoviesDisplay} type={tabSelection} />
							)}
						</motion.div>
					)}
				</motion.div>
			</AnimatePresence>
			{favMoviesDisplay.length === 0 && likedMoviesDisplay.length === 0 ? (
				<footer className='flex justify-center items-center w-full pt-5'>
					<button
						className='border-4 border-black opacity-60 rounded-md bg-white text-black p-5 active:bg-black active:text-white'
						onClick={() => RefreshMarkedMovies()}>
						REFRESH LIST
					</button>
				</footer>
			) : (
				""
			)}
		</section>
	);
};

export default MarkedFilms;
