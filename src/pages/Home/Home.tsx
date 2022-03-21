import { CommonPage } from "components";
import { AddNewTaskCardInput } from "./AddNewTaskCardInput";
import { TaskList } from "./TaskList";
import styles from "./styles.module.scss";

export const Home = () => {
	const { taskListContainer, taskListTitle } = styles;

	return (
		<CommonPage>
			<section className={taskListContainer}>
				<h1>Add a new task to the list</h1>
				<AddNewTaskCardInput />
				<h1 className={taskListTitle}>Your tasks</h1>
				<TaskList />
			</section>
		</CommonPage>
	);
};
