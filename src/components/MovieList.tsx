import { motion } from "framer-motion";
import { useAppSelector } from "../hooks";
import { nanoid } from "nanoid";
import { Button } from "flowbite-react";
import { useState } from "react";
const MovieList = () => {
	const [page, setPage] = useState<number>(1);
	const movies = useAppSelector((store) => store.movies);
	const isLoading = useAppSelector((store) => store.isLoading);
	if (isLoading) {
		return (
			<motion.div className='text-white flex justify-center text-[32px] items-center'>
				Loading...
			</motion.div>
		);
	}
	//todo: animation component that animates in loop
	return (
		<motion.section className='flex flex-col justify-center items-center'>
			<motion.div
				className='grid md:grid-cols-5 p-5 gap-2 sm:grid-cols-3 z-0'
				key={nanoid(3)}
				initial={{ y: "50%", opacity: 0 }}
				animate={{ y: "0", opacity: 1 }}
				transition={{ type: "spring", duration: "0.7" }}
				exit={{ x: "-50%", opacity: 0 }}>
				{movies[page].map((i: any) => {
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
			<motion.div
				key={nanoid(3)}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ type: "spring", duration: "0.7" }}
				id='pages'
				className='flex flex-shrink justify-center items-center gap-2'>
				<Button
					onClick={() => {
						setPage(1);
					}}>
					1
				</Button>
				<Button
					onClick={() => {
						setPage(2);
					}}>
					2
				</Button>
				<Button
					onClick={() => {
						setPage(3);
					}}>
					3
				</Button>
			</motion.div>
		</motion.section>
	);
};

export default MovieList;
