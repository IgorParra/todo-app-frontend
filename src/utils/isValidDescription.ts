import { toast } from "react-toastify";

export const isValidDescription = ({
	description,
	field,
}: {
	description: string;
	field: "task" | "subTask";
}) => {
	if (description === "") {
		toast.error(`An error has occurred: ${field} description can't be void.`);
		return false;
	}

	return true;
};
