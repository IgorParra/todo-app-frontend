import { Route, Routes } from "react-router-dom";
import { Home, Details } from "pages/index";

export const RoutePaths = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/details" element={<Details />} />
			</Routes>
		</>
	);
};
