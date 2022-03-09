import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./authContex";
import { ProviderProps } from "./types";

export const AppProvider = ({ children }: ProviderProps) => {
	return (
		<ChakraProvider>
			<AuthProvider>{children}</AuthProvider>
		</ChakraProvider>
	);
};
