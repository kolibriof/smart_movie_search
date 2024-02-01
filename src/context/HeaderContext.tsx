import { useState } from "react";
import { createContext } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
	FetchMoviesProps,
	fetchFavMovies,
	fetchLikedMovies,
} from "../slices/DisplayMoviesSlice";
import { readDB } from "../slices/FetchUserSlice";
import { setModalSettings } from "../slices/FetchMovieSlice";
import { store } from "../store";
import { toast } from "react-toastify";

interface defaultContextProps {
	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	RefreshMarkedMovies: (del?: boolean) => void;
	handleModal: (id: string) => void;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
}

const InitialProps: defaultContextProps = {
	page: 1,
	setPage: () => {},
	isMenuOpen: false,
	setIsMenuOpen: () => {},
	RefreshMarkedMovies: () => {},
	handleModal: () => {},
};

export const HeaderContext = createContext<defaultContextProps>(InitialProps);

const HeaderContextWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const dispatch = useAppDispatch();
	const { currentUser } = useAppSelector((store) => store.userSlice);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const RefreshMarkedMovies = async (del?: boolean) => {
		if (del) {
			let tempSettings: FetchMoviesProps = {
				favMovies: store.getState().userSlice.currentUser[0].favFilms.join(","),
				likedMovies: store
					.getState()
					.userSlice.currentUser[0].likedFilms.join(","),
			};
			dispatch(fetchFavMovies(tempSettings));
			dispatch(fetchLikedMovies(tempSettings));
			toast.success("Movie has been removed!");
			return;
		}
		try {
			const readSuccess = await dispatch(readDB(currentUser[0].id));
			if (readSuccess) {
				let tempSettings: FetchMoviesProps = {
					favMovies: currentUser[0].favFilms.join(","),
					likedMovies: currentUser[0].likedFilms.join(","),
				};
				dispatch(fetchFavMovies(tempSettings));
				dispatch(fetchLikedMovies(tempSettings));
			}
		} catch (error) {
			console.log("there was an error fetching films");
		}
	};
	const [page, setPage] = useState<number>(1);

	const handleModal = (id?: string) => {
		const el = document.getElementById("main");
		if (id) {
			if (el) {
				el!.style.pointerEvents = "none";
			}
			let tempSettings = { id: id, opened: true, page: page };
			console.log(tempSettings);
			dispatch(setModalSettings(tempSettings));
		}
	};
	return (
		<HeaderContext.Provider
			value={{
				isMenuOpen,
				setIsMenuOpen,
				RefreshMarkedMovies,
				page,
				setPage,
				handleModal,
			}}>
			{children}
		</HeaderContext.Provider>
	);
};

export default HeaderContextWrapper;
