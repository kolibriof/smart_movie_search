import FilterBar from "./components/FilterBar";
import "./index.css";
import MovieList from "./components/MovieList";
import { useAppSelector } from "./hooks";
import ModalView from "./components/ModalView";
import FeaturedMovie from "./components/FeaturedMovie";
import "./animations.css";
import InformationComponent from "./components/InformationComponent";
import Header from "./components/Header";

const App = () => {
	const movies = useAppSelector((store) => store.movieSlice.movies);
	return (
		<>
			<Header />
			<FilterBar />
			{movies[1 || 2 || 3].length >= 1 && <FeaturedMovie />}
			{movies[1 || 2 || 3].length >= 1 && <MovieList />}
			<InformationComponent />
			<ModalView />
		</>
	);
};

export default App;
