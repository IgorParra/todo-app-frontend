import { createContext, useState } from "react";
import { AuthProviderProps, ProviderProps, UserProps } from "./types";

export const AuthContext = createContext({} as AuthProviderProps);

export const AuthProvider = ({ children }: ProviderProps) => {
	const [user, setUser] = useState<UserProps | null>(null);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
