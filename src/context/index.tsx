import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./AuthContext/AuthContex";
import { TaskProvider } from "./TaskContext/TaskContext";
import { ProviderProps } from "./types";

import "react-toastify/dist/ReactToastify.css";
import "../styles/App.scss";
import { ModalProdiver } from "./ModalContext";

export const AppProvider = ({ children }: ProviderProps) => {
	return (
		<AuthProvider>
			<TaskProvider>
				<ModalProdiver>
					<>
						<ToastContainer theme="colored" />
						{children}
					</>
				</ModalProdiver>
			</TaskProvider>
		</AuthProvider>
	);
};

export default AppProvider;
