import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "../hooks";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

const FeaturedMovie = () => {
	const movies = useAppSelector((store) => store.movieSlice.movies);
	const [featuredMovie, setFeaturedMovie] = useState<any>(randomTitle());

	function randomTitle() {
		const getRandomPageValues =
			Object.values(movies)[
				Math.floor(Math.random() * Object.values(movies).length)
			];
		let randomTitle =
			getRandomPageValues[
				Math.floor(Math.random() * getRandomPageValues.length)
			];
		for (let i = 0; i < getRandomPageValues.length + 1; i++) {
			if (
				!getRandomPageValues[i].primaryImage ||
				!getRandomPageValues[i].primaryImage.url
			) {
				randomTitle =
					getRandomPageValues[
						Math.floor(Math.random() * getRandomPageValues.length)
					];
			}
			return randomTitle;
		}
	}
	useEffect(() => {
		let intervalId = setInterval(() => {
			setFeaturedMovie(randomTitle());
		}, 10000);
		return () => clearInterval(intervalId);
	}, [movies]);

	return (
		<motion.section className='flex flex-row w-full min-h-[60%] overflow-clip bg-black bg-opacity-50 p-5 '>
			<AnimatePresence mode='wait'>
				<motion.div className='w-1/2 flex featured-movie-img ' key={nanoid(5)}>
					<motion.img
						key={nanoid()}
						initial={{ opacity: 0, translateX: "-50%" }}
						animate={{ opacity: 1, translateX: "0" }}
						transition={{ duration: 0.9, type: "just" }}
						exit={{ opacity: 0, x: -500 }}
						src={
							featuredMovie.primaryImage
								? featuredMovie.primaryImage.url
								: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"
						}
						alt='movie'
						className='rounded-md border-[12px] border-solid border-white border-opacity-10'
					/>
				</motion.div>

				<motion.div
					key={nanoid(5)}
					className='flex w-1/2 items-center flex-col featured-movie-description '
					initial={{ opacity: 0, translateX: "50%" }}
					animate={{ opacity: 1, translateX: "0" }}
					transition={{ duration: 0.9, type: "just" }}
					exit={{ opacity: 0, x: 500 }}>
					<p className='text-[3.5em] text-white font-light h-full text-right min-w-[100%] '>
						{featuredMovie.titleText.text}
					</p>
					<p className='text-[2em] text-white font-thin text-right max-h-1/2 min-w-[100%] text-ellipsis'>
						{featuredMovie.plot && featuredMovie.plot.plotText
							? featuredMovie.plot.plotText.plainText
							: "No plot available"}
					</p>
				</motion.div>
			</AnimatePresence>
		</motion.section>
	);
};

export default FeaturedMovie;
