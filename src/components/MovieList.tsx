import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../hooks";
import { nanoid } from "nanoid";
import { useState } from "react";
import { setModalSettings } from "../slices/FetchMovieSlice";
import Buttons from "./Buttons";
const MovieList = () => {
	const dispatch = useAppDispatch();
	const [page, setPage] = useState<number>(1);
	const movies = useAppSelector((store) => store.movies);
	const errorMessage = useAppSelector((store) => store.errorMessage);
	const isLoading = useAppSelector((store) => store.isLoading);
	const handleModal = (id: string) => {
		if (id) {
			let tempSettings = { id: id, opened: true, page: page };
			dispatch(setModalSettings(tempSettings));
		}
	};
	if (isLoading) {
		return (
			<motion.div className='text-white flex justify-center text-[32px] items-center'>
				Loading...
			</motion.div>
		);
	}
	if (errorMessage) {
		return (
			<motion.div className='text-white flex justify-center text-[32px] items-center'>
				{errorMessage}
			</motion.div>
		);
	}
	return (
		<motion.section className='flex flex-col justify-center items-center'>
			<motion.div
				className='grid md:grid-cols-5 p-5 gap-2 sm:grid-cols-3 z-0'
				key={nanoid(3)}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, x: "50%" }}
				transition={{ type: "spring", duration: "2" }}>
				{movies[page].map((i: any) => {
					return (
						<motion.div
							onClick={() => handleModal(i.id)}
							key={i.id}
							className='flex flex-col items-center justify-center bg-white p-3 rounded-3xl drop-shadow-lg hover:scale-105 transition-all ease-out duration-300 cursor-pointer hover:z-[999] hover:drop-shadow-2xl min-h-[240px]'>
							<div className='img flex items-center justify-center flex-grow border-solid border-red-500'>
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
							<div className='title flex font-semibold text-center'>
								{i.originalTitleText.text}
							</div>
						</motion.div>
					);
				})}
			</motion.div>
			<Buttons setPage={setPage} page={page} />
		</motion.section>
	);
};

export default MovieList;
