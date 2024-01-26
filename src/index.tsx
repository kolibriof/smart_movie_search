import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const el = document.getElementById("root")!;

const root = createRoot(el);

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />}></Route>
			</Routes>
		</BrowserRouter>
	</Provider>,
);
