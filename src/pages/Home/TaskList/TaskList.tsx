import { List } from "components";
import { useTask } from "hooks/index";
import { TaskCard } from "components/TaskCard";
import styles from "./styles.module.scss";

export const TaskList = ({ ...rest }) => {
	const { container } = styles;
	const { taskList } = useTask();

	const cards = taskList.map((task) => <TaskCard task={task} key={task.id} />);

	return <List className={container} items={cards} {...rest} />;
};
