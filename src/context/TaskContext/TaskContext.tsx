import { createContext, useEffect, useState } from "react";
import { ProviderProps } from "../types";
import lodash from "lodash";
import { v4 as uuidv4 } from "uuid";
import {
	ChangeASingleTaskDataProps,
	TaskProps,
	TaskProviderProps,
} from "types/context/Task";
import {
	getLocalStorageItem,
	setLocalStorageItem,
	hasAtLeastTwoWords,
} from "utils/";

export const TaskContext = createContext({} as TaskProviderProps);

export const TaskProvider = ({ children }: ProviderProps) => {
	// since we don't have login, gonna use localStorage instead of sessionStorage
	const [taskList, setTaskList] = useState<TaskProps[] | []>(
		getLocalStorageItem("cogia-tasklist") || []
	);

	const changeASingleTaskData = ({
		taskId,
		newTaskData,
	}: ChangeASingleTaskDataProps) => {
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
				`An error has occurred: task description must have at least two words.`
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

	const removeTaskFromList = (taskId: string) => {
		const newTaskList = lodash.cloneDeep(taskList);
		const indexofTaskToDelete = newTaskList.findIndex(
			(task) => task.id === taskId
		);

		newTaskList.splice(indexofTaskToDelete, 1);

		setTaskList(newTaskList);
	};

	useEffect(() => {
		setLocalStorageItem({ key: "cogia-tasklist", value: taskList });
	}, [taskList]);

	return (
		<TaskContext.Provider
			value={{
				addNewTaskToTaskList,
				changeASingleTaskData,
				removeTaskFromList,
				taskList,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};
