import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
	DeleteMovieProps,
	deleteMovieFrom,
	readDB,
} from "../../slices/FetchUserSlice";
import { HeaderContext } from "../../context/HeaderContext";
import { nanoid } from "nanoid";
import { AnimatePresence, motion } from "framer-motion";

interface MarkedMoviesProps {
	movies: any[];
	type: "fav" | "liked";
}

const MarkedMovies: React.FC<MarkedMoviesProps> = ({ movies, type }) => {
	const dispatch = useAppDispatch();
	const { RefreshMarkedMovies } = useContext(HeaderContext);
	const { currentUser } = useAppSelector((store) => store.userSlice);
	const handleDeleteSpecificMovie = async (filmID: string) => {
		const currentMoviesTempArray = await dispatch(
			readDB(currentUser[0].id),
		).then((resp: any) => {
			let uptoDateFilms = {
				FavFilms: resp.payload.FavFilms,
				LikedFilms: resp.payload.LikedFilms,
			};
			return uptoDateFilms;
		});

		const settings: DeleteMovieProps = {
			currentFilms: {
				FavFilms: [...currentMoviesTempArray.FavFilms],
				LikedFilms: [...currentMoviesTempArray.LikedFilms],
			},
			filmID: filmID,
			type: type,
			userID: currentUser[0].id,
		};

		const deleted = await dispatch(deleteMovieFrom(settings));
		if (deleted) {
			RefreshMarkedMovies(true);
		}
	};
	return (
		<>
			{movies.map((i: any) => {
				return (
					<motion.div
						className='flex flex-col bg-white p-3 max-w-[90%] rounded-md border-black border-4 border-opacity-5 drop-shadow-2xl'
						key={nanoid(6)}>
						<div
							className='absolute right-0 top-0 cursor-pointer bg-red-500 rounded-full p-1 shadow-lg hover:drop-shadow-xl transition-all duration-150 hover:scale-105 ease-out '
							onClick={() => handleDeleteSpecificMovie(i.id)}>
							<img
								src='https://img.icons8.com/android/24/minus.png'
								alt='remove button'
								className='w-4'
							/>
						</div>

						<div className='img flex items-center justify-center flex-grow border-solid border-red-500 '>
							<img
								className='max-w-[80%] drop-shadow-lg '
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
					</motion.div>
				);
			})}
		</>
	);
};

export default MarkedMovies;
