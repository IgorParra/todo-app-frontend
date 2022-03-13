import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./authContex";
import { TaskProvider } from "./taskContext";

import { ProviderProps } from "./types";

export const AppProvider = ({ children }: ProviderProps) => {
	return (
		<ChakraProvider>
			<AuthProvider>
				<TaskProvider>
					<>
						<ToastContainer />
						{children}
					</>
				</TaskProvider>
			</AuthProvider>
		</ChakraProvider>
	);
};
