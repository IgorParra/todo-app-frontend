export type UserProps = {
	email: string;
	password: string;
};

export type AuthProviderProps = {
	user: UserProps | null;
	changeUser: (user: UserProps) => void;
};
