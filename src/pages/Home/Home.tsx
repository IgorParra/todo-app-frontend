import { ChangeEvent, useState } from "react";
import { Header, TaskList, AddNewTaskCard } from "components";
import { useTask } from "hooks";
import styles from "./styles.module.scss";

export const Home = () => {
	const { container, taskListContainer, taskList } = styles;
	const { addNewTaskToTaskList } = useTask();
	const [taskDescription, setTaskDescription] = useState<string>("");

	const handleAddNewTask = async () => {
		try {
			addNewTaskToTaskList({ newTaskDescription: taskDescription });
		} catch (e: any) {}
	};

	const handleOnInputChange = (element: ChangeEvent<HTMLTextAreaElement>) => {
		const {
			target: { value },
		} = element;
		setTaskDescription(value);
	};

	return (
		<main className={container}>
			<Header />
			<div className={taskListContainer}>
				<AddNewTaskCard
					title="Add new task to list"
					onClick={handleAddNewTask}
					onChange={(element) => handleOnInputChange(element)}
				/>
				<TaskList className={taskList} title={"Tasklist"} />
			</div>
		</main>
	);
};
