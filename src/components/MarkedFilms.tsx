import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import MarkedMovies from "./UserMovies/MarkedMovies";
import { nanoid } from "nanoid";
import { HeaderContext } from "../context/HeaderContext";

const MarkedFilms = () => {
	const dispatch = useAppDispatch();
	const { favMoviesDisplay, likedMoviesDisplay } = useAppSelector(
		(store) => store.displayMoviesSlice,
	);
	const [tabSelection, setTabSelection] = useState<"fav" | "liked">("fav");
	const { RefreshMarkedMovies } = useContext(HeaderContext);
	return (
		<section className='flex flex-col w-full pt-2 pb-2'>
			<header className='flex flex-row w-full min-h-10 p-1 '>
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
				{tabSelection === "fav" ? (
					<motion.div
						key={"fav"}
						className='grid grid-cols-5 min-w-full gap-3 justify-items-center'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							duration: 0.2,
							type: "spring",
						}}
						exit={{ opacity: 0 }}>
						{favMoviesDisplay && favMoviesDisplay.length >= 1 && (
							<MarkedMovies movies={favMoviesDisplay} type={tabSelection} />
						)}
					</motion.div>
				) : (
					<motion.div
						key={"liked"}
						className='grid grid-cols-5 min-w-full justify-items-center gap-3'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							duration: 0.2,
							type: "spring",
						}}
						exit={{ opacity: 0 }}>
						{likedMoviesDisplay && likedMoviesDisplay.length >= 1 && (
							<MarkedMovies movies={likedMoviesDisplay} type={tabSelection} />
						)}
					</motion.div>
				)}
			</AnimatePresence>
			{!favMoviesDisplay && !likedMoviesDisplay ? (
				<footer className='flex justify-center items-center w-full pt-5'>
					<button
						className='border-4 border-black border-opacity-50 rounded-md bg-white text-black p-5 active:bg-black active:text-white'
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
