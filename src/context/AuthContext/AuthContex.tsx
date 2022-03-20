import { createContext, useState } from "react";
import { ProviderProps } from "../types";
import { AuthProviderProps, UserProps } from "types/context/Auth";

export const AuthContext = createContext({} as AuthProviderProps);

export const AuthProvider = ({ children }: ProviderProps) => {
	const [user, setUser] = useState<UserProps | null>(null);

	const changeUser = (user: UserProps) => {
		setUser(user);
	};

	return (
		<AuthContext.Provider value={{ user, changeUser }}>
			{children}
		</AuthContext.Provider>
	);
};
