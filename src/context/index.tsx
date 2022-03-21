import { ToastContainer } from "react-toastify";
import { TaskProvider } from "./TaskContext/TaskContext";
import { ProviderProps } from "./types";

import "react-toastify/dist/ReactToastify.css";
import "../styles/App.scss";
import { ModalProdiver } from "./ModalContext";

export const AppProvider = ({ children }: ProviderProps) => {
	return (
		<TaskProvider>
			<ModalProdiver>
				<>
					<ToastContainer theme="colored" />
					{children}
				</>
			</ModalProdiver>
		</TaskProvider>
	);
};

export default AppProvider;
