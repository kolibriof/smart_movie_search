import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import ModalView from "./components/ModalView";
import HeaderContextWrapper from "./context/AppContext";
import ModalContextWrapper from "./context/ModalContext";
import LocationProvider from "./components/helpers/LocationProvider";
import RoutesWithAnimation from "./components/helpers/RoutesWithAnimation";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<HeaderContextWrapper>
					<section className='h-[100svh] items-center sm:overflow-scroll overflow-hidden flex flex-col gap-1'>
						<ModalContextWrapper>
							<Header />
						</ModalContextWrapper>
						<LocationProvider>
							<RoutesWithAnimation />
						</LocationProvider>
						<ToastContainer />
						<ModalContextWrapper>
							<ModalView />
						</ModalContextWrapper>
					</section>
				</HeaderContextWrapper>
			</BrowserRouter>
		</>
	);
};

export default App;
