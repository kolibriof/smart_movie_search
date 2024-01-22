import FilterBar from "./components/FilterBar";
import "./index.css";
import MovieList from "./components/MovieList";
import { useAppSelector } from "./hooks";
import ModalView from "./components/ModalView";

const App = () => {
	const movies = useAppSelector((store) => store.movies);
	return (
		<section className='h-[100vh] items-center justify-center overflow-hidden '>
			<FilterBar />
			{Object.keys(movies).length >= 1 && <MovieList />}
			<ModalView id='s' />
		</section>
	);
};

export default App;
