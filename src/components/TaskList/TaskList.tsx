import { useTask } from "hooks/index";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { TaskCard } from "../TaskCard/TaskCard";
import styles from "./styles.module.scss";

type TaskListProps = DetailedHTMLProps<
	HTMLAttributes<HTMLUListElement>,
	HTMLUListElement
> & {
	title?: string;
};

export const TaskList = ({ title, ...rest }: TaskListProps) => {
	const { container } = styles;
	const { taskList } = useTask();

	return (
		<ul className={container} {...rest}>
			{taskList.map((task) => (
				<TaskCard task={task} key={task.id} />
			))}
		</ul>
	);
};
