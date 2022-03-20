import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryParams, useTask } from "hooks";
import { CommonPage, Input } from "components";
import { dateFormat } from "utils";
import styles from "./styles.module.scss";

export const Details = (props: any) => {
	const { container } = styles;
	const { taskList } = useTask();
	const params = useQueryParams();
	const navigate = useNavigate();

	const taskId = params.get("taskId");

	const task = taskList.find((task) => task.id === taskId);

	useEffect(() => {
		if (taskId == null) {
			navigate("/");
		}
	}, [taskId, navigate]);

	return (
		<CommonPage>
			<article className={container}>
				<h1>Task Details</h1>
				{task && (
					<section>
						<Input id="task-id" value={task.id} label="Task ID:" />

						<Input
							id="task-id"
							value={task.description}
							label="Task description:"
						/>

						<Input
							id="task-id"
							value={dateFormat({ locales: "pt-PT", value: task.createdAt })}
							label="Task was created at:"
						/>
					</section>
				)}
			</article>
		</CommonPage>
	);
};
