import { motion } from "framer-motion";
import { useAppSelector } from "../hooks";
import { nanoid } from "nanoid";
const MovieList = () => {
	const movies = useAppSelector((store) => store.movies);
	return (
		<motion.div
			className='grid md:grid-cols-5 p-5 gap-2 sm:grid-cols-3'
			key={nanoid(3)}
			initial={{ y: "50%", opacity: 0 }}
			animate={{ y: "0", opacity: 1 }}
			transition={{ type: "spring", duration: "0.7" }}>
			{movies.map((i: any) => {
				return (
					<motion.div
						key={i.id}
						className='flex flex-col items-center justify-center bg-white p-3 rounded-3xl shadow-2xl'>
						<div className='img flex items-center justify-center flex-grow border-solid border-red-500'>
							<img
								className='w-[50%] drop-shadow-lg '
								src={i.primaryImage ? i.primaryImage.url : ""}
								alt={i.originalTitleText.text}
							/>
						</div>
						<div className='title flex'>{i.originalTitleText.text}</div>
					</motion.div>
				);
			})}
		</motion.div>
	);
};

export default MovieList;
