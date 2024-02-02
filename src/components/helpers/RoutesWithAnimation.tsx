import { Routes, Route, useLocation } from "react-router";
import FilterBar from "../FilterBar";

import MarkedFilms from "../MarkedFilms";
import FeaturedMovie from "../FeaturedMovie";
import MovieList from "../MovieList";

const RoutesWithAnimation = () => {
	const location = useLocation();
	return (
		<Routes location={location} key={location.key}>
			<Route path='/' index element={<FilterBar />} />
			<Route path='/markedFilms' element={<MarkedFilms />} />
			<Route
				path='/searchedFilms'
				element={
					<>
						<FeaturedMovie />
						<MovieList />
					</>
				}
			/>
		</Routes>
	);
};

export default RoutesWithAnimation;
