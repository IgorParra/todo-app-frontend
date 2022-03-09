import { Dispatch } from "react";

export type ProviderProps = {
	children: JSX.Element;
};

export type UserProps = {
	email: string;
	password: string;
};

export type AuthProviderProps = {
	user: UserProps | null;
	setUser: Dispatch<React.SetStateAction<UserProps | null>>;
};
