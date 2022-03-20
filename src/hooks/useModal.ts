import { useContext } from "react";
import { ModalContext } from "context/ModalContext";

export const useModal = () => {
	const context = useContext(ModalContext);

	if (!context) {
		throw new Error(
			"useModal must be used wrapped in an ModalContext or AppProvider"
		);
	}

	return context;
};
