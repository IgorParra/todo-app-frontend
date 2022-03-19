import { useTask } from "hooks/index";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { TaskCard } from "../TaskCard/TaskCard";
import styles from "./styles.module.scss";

type TaskListProps = DetailedHTMLProps<
	HTMLAttributes<HTMLElement>,
	HTMLElement
> & {
	title?: string;
};

export const TaskList = ({ title, ...rest }: TaskListProps) => {
	const { container } = styles;
	const { taskList } = useTask();

	return (
		<section {...rest}>
			{title && taskList.length > 0 && <h1>{title}</h1>}
			<ul className={container}>
				{taskList.map((task) => (
					<TaskCard task={task} key={task.id} />
				))}
			</ul>
		</section>
	);
};
