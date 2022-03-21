export type TaskProps = {
	id: string;
	description: string;
	createdAt: Date;
	status: "pending" | "concluded";
	subTasks: SubTaskProps[];
};

export type SubTaskProps = {
	id: string;
	description: string;
	isConcluded: boolean;
};

export type TaskProviderProps = {
	taskList: TaskProps[] | [];
	addNewTaskToTaskList: ({
		description,
		subTasks,
	}: Pick<TaskProps, "description" | "subTasks">) => void;
	changeASingleTaskData: (task: TaskProps) => void;

	removeTaskFromList: (taskId: string) => void;
};

export type NewTaskDataProps = Pick<TaskProps, "description">;

export type ChangeASingleTaskDataProps = {
	taskId: string;
	newTaskData: NewTaskDataProps;
};
