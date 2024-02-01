import FilterBar from "./components/FilterBar";
import "./index.css";
import MovieList from "./components/MovieList";
import { useAppSelector } from "./hooks";

import FeaturedMovie from "./components/FeaturedMovie";
import "./animations.css";
import InformationComponent from "./components/InformationComponent";

const App = () => {
	const movies = useAppSelector((store) => store.movieSlice.movies);
	return (
		<>
			<FilterBar />
			{movies[1 || 2 || 3].length >= 1 && <FeaturedMovie />}
			{movies[1 || 2 || 3].length >= 1 && <MovieList />}
			<InformationComponent />
		</>
	);
};

export default App;
