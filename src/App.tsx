import { AppProvider } from "./context";
import { RoutePaths } from "./routes/index.routes";

export const App = () => {
	return (
		<AppProvider>
			<RoutePaths />
		</AppProvider>
	);
};

export default App;
