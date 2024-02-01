import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarkedFilms from "./components/MarkedFilms";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import ModalView from "./components/ModalView";
import { ToastContainer } from "react-toastify";
import HeaderContextWrapper from "./context/HeaderContext";

const el = document.getElementById("root")!;

const root = createRoot(el);

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<HeaderContextWrapper>
				<section className='h-[100svh] items-center sm:overflow-scroll overflow-hidden flex flex-col gap-1'>
					<Routes>
						<Route element={<Header />}>
							<Route path='/' index element={<App />} />
							<Route path='/markedFilms' element={<MarkedFilms />} />
						</Route>
					</Routes>
					<ToastContainer />
					<ModalView />
				</section>
			</HeaderContextWrapper>
		</BrowserRouter>
	</Provider>,
);
