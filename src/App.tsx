import FilterBar from "./components/FilterBar";
import "./index.css";
import MovieList from "./components/MovieList";
import { useAppSelector } from "./hooks";

const App = () => {
	const movies = useAppSelector((store) => store.movies);
	return (
		<section className='h-[100vh] items-center justify-center overflow-hidden '>
			<FilterBar />
			{Object.keys(movies).length >= 1 && <MovieList />}
		</section>
	);
};

export default App;
