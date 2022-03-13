import { Dispatch } from "react";

export type ProviderProps = {
	children: JSX.Element;
};

export type UserProps = {
	email: string;
	password: string;
};

export type TaskProps = {
	id: string;
	description: string;
	createdAt: Date;
	status: "pending" | "concluded";
};

export type AuthProviderProps = {
	user: UserProps | null;
	setUser: Dispatch<React.SetStateAction<UserProps | null>>;
};

export type TaskProviderProps = {
	taskList: TaskProps[] | [];
	changeASingleTaskData: (props: changeASingleTaskDataProps) => void;
	addNewTaskToTaskList: (props: newTaskDataProps) => void;
};

export type newTaskDataProps = Pick<TaskProps, "description">;

export type changeASingleTaskDataProps = {
	taskId: string;
	newTaskData: newTaskDataProps;
};
