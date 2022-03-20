import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Details } from "pages/index";

export const RoutePaths = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/details" element={<Details />} />
			</Routes>
		</BrowserRouter>
	);
};
