import { ChangeEvent, useState } from "react";
import { AddNewTaskCard, CommonPage } from "components";
import { TaskList } from "./TaskList";
import { useTask } from "hooks";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";

export const Home = () => {
	const { taskListContainer, taskListTitle } = styles;
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
		<CommonPage>
			<section className={taskListContainer}>
				<h1>Add a new task to the list</h1>
				<AddNewTaskCard
					value={taskDescription}
					onClick={() => handleAddNewTask(taskDescription)}
					onChange={(element) => handleOnInputChange(element)}
				/>
				<h1 className={taskListTitle}>Your tasks</h1>
				<TaskList />
			</section>
		</CommonPage>
	);
};
