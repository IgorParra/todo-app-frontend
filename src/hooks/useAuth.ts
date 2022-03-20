import { useContext } from "react";
import { AuthContext } from "context/AuthContext/AuthContex";

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error(
			"useAuth must be used wrapped in an AuthContext or AppProvider"
		);
	}

	return context;
};
