import FilterBar from "./components/FilterBar";
import "./index.css";
import MovieList from "./components/MovieList";
import { useAppSelector } from "./hooks";
import ModalView from "./components/ModalView";

const App = () => {
	const movies = useAppSelector((store) => store.movies);
	return (
		<section className='h-[100svh] items-center justify-center md:overflow-hidden sm:overflow-scroll'>
			<FilterBar />
			{Object.keys(movies).length >= 1 && <MovieList />}
			<ModalView />
		</section>
	);
};

export default App;
