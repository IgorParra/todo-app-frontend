import { createContext, useEffect, useState } from "react";
import { ProviderProps } from "../types";
import lodash from "lodash";
import { v4 as uuidv4 } from "uuid";
import { TaskProps, TaskProviderProps } from "types/context/Task";
import { getLocalStorageItem, setLocalStorageItem } from "utils/";

export const TaskContext = createContext({} as TaskProviderProps);

export const TaskProvider = ({ children }: ProviderProps) => {
	// since we don't have login, gonna use localStorage instead of sessionStorage
	const [taskList, setTaskList] = useState<TaskProps[] | []>(
		getLocalStorageItem("cogia-tasklist") || []
	);

	const addNewTaskToTaskList = ({
		description,
		subTasks,
	}: Pick<TaskProps, "description" | "subTasks">) => {
		if (description === "" || subTasks.length === 0) {
			throw new Error(
				"An error has occurred: neither description or subtasks can't be void, please, verify those fields."
			);
		}

		const newTaskToAdd: TaskProps = {
			id: uuidv4(),
			createdAt: new Date(),
			status: "pending",
			description,
			subTasks,
		};
		const newTaskList: TaskProps[] = lodash.cloneDeep(taskList);

		newTaskList.push(newTaskToAdd);

		setTaskList(newTaskList);
	};

	const changeASingleTaskData = (task: TaskProps) => {
		const { id } = task;
		const newTaskList = lodash.cloneDeep(taskList);

		const tasktToUpdateIndex = newTaskList.findIndex((task) => task.id === id);

		if (tasktToUpdateIndex >= 0) {
			newTaskList[tasktToUpdateIndex] = task;
		}
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
