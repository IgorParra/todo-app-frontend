import { useContext } from "react";
import { TaskContext } from "../context/taskContext";

export const useTask = () => {
	const context = useContext(TaskContext);

	if (!context) {
		throw new Error(
			"useTask must be used wrapped in an TaskContext or AppProvider"
		);
	}

	return context;
};
