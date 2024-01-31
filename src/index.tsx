import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarkedFilms from "./components/MarkedFilms";
import Header from "./components/Header";

const el = document.getElementById("root")!;

const root = createRoot(el);

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<section className='h-[100svh] items-center sm:overflow-scroll overflow-hidden flex flex-col gap-1'>
				<Routes>
					<Route path='/' element={<App />}></Route>
					<Route
						path='markedFilms'
						element={
							<>
								<Header />
								<MarkedFilms />
							</>
						}
					/>
				</Routes>
			</section>
		</BrowserRouter>
	</Provider>,
);
