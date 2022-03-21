import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryParams, useTask } from "hooks";
import { CardOptionButton, CommonPage, Input } from "components";
import { dateFormat } from "utils";
import styles from "./styles.module.scss";
import { SubTaskProps, TaskProps } from "types/context/Task";
import { SubTaskList } from "components";
import { toast } from "react-toastify";

export const Details = (props: any) => {
	const { container, buttonsContainer, taskIdAndCreatedAtContainer, title } =
		styles;
	const { taskList, changeASingleTaskData } = useTask();
	const params = useQueryParams();
	const navigate = useNavigate();

	const taskId = params.get("taskId");

	const task = useMemo(
		() => taskList.find((task) => task.id === taskId) || ({} as TaskProps),
		[taskList, taskId]
	);
	const [newTaskInfo, setNewTaskInfo] = useState(task);

	const hasChanges = JSON.stringify(task) !== JSON.stringify(newTaskInfo);

	const updateTaskDescription = (description: string) => {
		setNewTaskInfo((prevState: TaskProps) => ({
			...prevState,
			description,
		}));
	};

	const subTaskListCallBack = (data: SubTaskProps[]) => {
		setNewTaskInfo((prevState) => ({ ...prevState, subTasks: data }));
	};

	const handleSaveChanges = (taskInfo?: TaskProps) => {
		changeASingleTaskData(taskInfo ? taskInfo : { ...newTaskInfo });
		toast.success("Task successfully updated");
	};

	const handleRevertAllChanges = () => {
		setNewTaskInfo(task);
		toast.success("All changes has been reverted");
	};

	const handleMarkTaskAsConcluded = () => {
		const allSubTaskCompleted = newTaskInfo.subTasks.reduce(
			(previousValue, currentValue) => {
				return previousValue === true && currentValue.isConcluded === true;
			},
			true
		);

		if (!allSubTaskCompleted) {
			return toast.error("Not all subtasks has been completed");
		}

		return handleSaveChanges({ ...newTaskInfo, status: "concluded" });
	};

	useEffect(() => {
		if (taskId == null) {
			navigate("/");
		}
	}, [taskId, navigate]);

	return (
		<CommonPage>
			<article className={container}>
				<h1>Task Details</h1>
				{newTaskInfo && (
					<section>
						<div className={buttonsContainer}>
							{newTaskInfo.status !== "concluded" && (
								<CardOptionButton
									title={"Sett task as concluded"}
									onClick={() => handleMarkTaskAsConcluded()}
									buttonType="concluded"
								/>
							)}
							<CardOptionButton
								title={"Save changes"}
								onClick={() => hasChanges && handleSaveChanges()}
								buttonType="saveoredit"
								disabled={!hasChanges}
							/>

							<CardOptionButton
								title="Revert changes"
								onClick={() => handleRevertAllChanges()}
								buttonType="revert"
								disabled={!hasChanges}
							/>
						</div>
						<div className={taskIdAndCreatedAtContainer}>
							<Input
								id="task-id"
								value={newTaskInfo.id}
								label="Task ID:"
								disabled
							/>
							<Input
								disabled
								id="task-createdAt"
								value={dateFormat({
									locales: "pt-PT",
									value: newTaskInfo.createdAt,
								})}
								label="Created at:"
							/>
						</div>
						<Input
							id="task-id"
							value={newTaskInfo.description}
							label="Task description:"
							onChange={({ target: { value } }) => updateTaskDescription(value)}
						/>{" "}
						<Input
							disabled
							id="task-status"
							value={newTaskInfo.status}
							label="Task Status"
						/>
						<h1 className={title}>Subtasks</h1>
						<SubTaskList
							list={newTaskInfo.subTasks || ([] as SubTaskProps[])}
							callBack={(data) => subTaskListCallBack(data)}
							canCheck={newTaskInfo.status !== "concluded"}
						/>
					</section>
				)}
			</article>
		</CommonPage>
	);
};
