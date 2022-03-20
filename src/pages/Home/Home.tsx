import { ChangeEvent, useState } from "react";
import { Header, TaskList, AddNewTaskCard } from "components";
import { useTask } from "hooks";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";

export const Home = () => {
	const { container, taskListContainer, taskListTitle } = styles;
	const { addNewTaskToTaskList } = useTask();
	const [taskDescription, setTaskDescription] = useState<string>("");

	const handleAddNewTask = async (taskDescription: string) => {
		try {
			await addNewTaskToTaskList({ newTaskDescription: taskDescription });
			setTaskDescription("");
		} catch (e: any) {
			toast.error(e.message);
		}
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
				<h1>Add a new task to the list</h1>
				<AddNewTaskCard
					value={taskDescription}
					onClick={() => handleAddNewTask(taskDescription)}
					onChange={(element) => handleOnInputChange(element)}
				/>
				<h1 className={taskListTitle}>Your tasks</h1>
				<TaskList title={"Tasklist"} />
			</div>
		</main>
	);
};
