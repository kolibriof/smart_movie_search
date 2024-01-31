import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useState } from "react";
import { setModalSettings } from "../slices/FetchMovieSlice";
import Buttons from "./Buttons";
import { nanoid } from "nanoid";
import { addFavFilm, addLikedFilm } from "../slices/FetchUserSlice";
const MovieList = () => {
	const dispatch = useAppDispatch();
	const [page, setPage] = useState<number>(1);
	const movies = useAppSelector((store) => store.movieSlice.movies);

	const handleModal = (id: string) => {
		const el = document.getElementById("main");
		if (id) {
			el!.style.pointerEvents = "none";
			let tempSettings = { id: id, opened: true, page: page };
			dispatch(setModalSettings(tempSettings));
		}
	};

	return (
		<motion.section className='flex flex-col items-center w-[100%] h-[100%] justify-end min-h-[30%] movie-list-appearance'>
			<AnimatePresence mode='wait'>
				<motion.div
					key={nanoid(5)}
					transition={{
						duration: 0.2,
						type: "just",
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='flex flex-row overflow-hidden items-center hover:overflow-x-scroll p-5 gap-3 bg-white bg-opacity-10 shadow-2xl movie-list-bg-gradient'
					id='main'>
					{movies[page].map((i: any) => {
						return (
							<motion.div
								onClick={() => handleModal(i.id)}
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
				</motion.div>
			</AnimatePresence>
			<Buttons setPage={setPage} page={page} />
		</motion.section>
	);
};

export default MovieList;
