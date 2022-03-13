import { createContext, useContext, useState } from "react";
import {
	changeASingleTaskDataProps,
	newTaskDataProps,
	ProviderProps,
	TaskProps,
	TaskProviderProps,
} from "./types";
import lodash from "lodash";
import { v4 as uuidv4 } from "uuid";

export const TaskContext = createContext({} as TaskProviderProps);

export const TaskProvider = ({ children }: ProviderProps) => {
	const [taskList, setTaskList] = useState<TaskProps[] | []>([]);

	const changeASingleTaskData = ({
		taskId,
		newTaskData,
	}: changeASingleTaskDataProps) => {
		const { description } = newTaskData;
		const newTaskList = lodash.cloneDeep(taskList);
		let taskToUpdate = newTaskList.find((task) => task.id === taskId);

		if (taskToUpdate) {
			taskToUpdate = { ...taskToUpdate, description };
		}

		setTaskList(newTaskList);
	};

	const addNewTaskToTaskList = (newTaskData: newTaskDataProps) => {
		const newTaskToAdd: TaskProps = {
			id: uuidv4(),
			createdAt: new Date(),
			status: "pending",
			...newTaskData,
		};
		const newTaskList: TaskProps[] = lodash.cloneDeep(taskList);

		newTaskList.push(newTaskToAdd);

		setTaskList(newTaskList);
	};

	return (
		<TaskContext.Provider
			value={{ taskList, changeASingleTaskData, addNewTaskToTaskList }}
		>
			{children}
		</TaskContext.Provider>
	);
};
