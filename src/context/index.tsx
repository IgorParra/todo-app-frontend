import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./authContex";
import { TaskProvider } from "./taskContext";
import { ProviderProps } from "./types";

import "../styles/App.scss";

export const AppProvider = ({ children }: ProviderProps) => {
	return (
		<AuthProvider>
			<TaskProvider>
				<>
					<ToastContainer />
					{children}
				</>
			</TaskProvider>
		</AuthProvider>
	);
};

export default AppProvider;
