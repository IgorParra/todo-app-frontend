import { createContext, useEffect, useState } from "react";
import {
	changeASingleTaskDataProps,
	ProviderProps,
	TaskProps,
	TaskProviderProps,
} from "./types";
import lodash from "lodash";
import { v4 as uuidv4 } from "uuid";
import { hasAtLeastTwoWords } from "utils/hasAtLeastTwoWords";

export const TaskContext = createContext({} as TaskProviderProps);

export const TaskProvider = ({ children }: ProviderProps) => {
	const [taskList, setTaskList] = useState<TaskProps[] | []>([]);

	const changeASingleTaskData = ({
		taskId,
		newTaskData,
	}: changeASingleTaskDataProps) => {
		const { description } = newTaskData;
		const newTaskList = lodash.cloneDeep(taskList);
		const tasktToUpdateIndex = newTaskList.findIndex(
			(task) => task.id === taskId
		);

		if (tasktToUpdateIndex >= 0) {
			newTaskList[tasktToUpdateIndex] = {
				...newTaskList[tasktToUpdateIndex],
				description,
			};
		}
		setTaskList(newTaskList);
	};

	const addNewTaskToTaskList = ({
		newTaskDescription,
	}: {
		newTaskDescription: string;
	}) => {
		if (!hasAtLeastTwoWords(newTaskDescription)) {
			throw new Error(
				"An error has occurred: task description must have at least two words"
			);
		}
		const newTaskToAdd: TaskProps = {
			id: uuidv4(),
			createdAt: new Date(),
			status: "pending",
			description: newTaskDescription,
		};
		const newTaskList: TaskProps[] = lodash.cloneDeep(taskList);

		newTaskList.push(newTaskToAdd);

		setTaskList(newTaskList);
	};
	useEffect(() => {
		console.log(taskList);
	}, [taskList]);

	return (
		<TaskContext.Provider
			value={{ taskList, changeASingleTaskData, addNewTaskToTaskList }}
		>
			{children}
		</TaskContext.Provider>
	);
};
