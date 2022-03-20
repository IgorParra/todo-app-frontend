export type TaskProps = {
	id: string;
	description: string;
	createdAt: Date;
	status: "pending" | "concluded";
};

export type TaskProviderProps = {
	taskList: TaskProps[] | [];
	changeASingleTaskData: ({
		taskId,
		newTaskData,
	}: ChangeASingleTaskDataProps) => void;
	addNewTaskToTaskList: ({
		newTaskDescription,
	}: {
		newTaskDescription: string;
	}) => void;
	removeTaskFromList: (taskId: string) => void;
};

export type NewTaskDataProps = Pick<TaskProps, "description">;

export type ChangeASingleTaskDataProps = {
	taskId: string;
	newTaskData: NewTaskDataProps;
};
