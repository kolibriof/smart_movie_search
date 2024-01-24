import { motion } from "framer-motion";
import { useAppSelector } from "../hooks";

const FeaturedMovie = () => {
	const movies = useAppSelector((store) => store.movies);
	return (
		<motion.section className='flex flex-row w-full min-h-[60%] overflow-clip bg-black bg-opacity-50 p-5'>
			<motion.div className='w-1/2 flex featured-movie-img'>
				<img
					src={movies[1]?.length >= 1 && movies[1][1].primaryImage.url}
					alt={movies[1]?.length >= 1 && movies[1][1].plot.plotText.plainText}
					className='rounded-md border-[12px] border-solid border-white border-opacity-10'
				/>
			</motion.div>
			<div className='flex w-1/2 items-center flex-col featured-movie-description'>
				<p className='flex text-[3.5em] text-white font-light text-center h-full self-end'>
					{movies[1]?.length >= 1 && movies[1][1].titleText.text}
				</p>
				<p className='text-[2em] text-white font-thin text-right h-1/2'>
					{movies[1]?.length >= 1 && movies[1][1].plot.plotText.plainText}
				</p>
			</div>
		</motion.section>
	);
};

export default FeaturedMovie;
