import { useState } from "react";
import { TaskProps } from "types/context/Task";
import styles from "./styles.module.scss";
import { dateFormat } from "utils/date";
import { useFocus, useTask } from "hooks";

import { useModal } from "hooks/useModal";
import { toast } from "react-toastify";
import { SubTaskList } from "components/SubTaskList";
import { OptionButtons } from "./OptionButtons";
import { NavLink } from "react-router-dom";

export const TaskCard = ({ task }: { task: TaskProps }) => {
	const { taskCard, cardOptionButtonContainer, concluded } = styles;
	const { description, subTasks } = task;
	const { changeASingleTaskData, removeTaskFromList } = useTask();
	const { openModal, changeDialogueWindowData, closeModal } = useModal();
	const [canEdit, setCanEdit] = useState(false);

	const [newTaskDescription, setNewTaskDescription] = useState(
		task.description
	);

	const [ref] = useFocus<HTMLInputElement>();

	const dateFormatProps = { locales: "pt-PT", value: task.createdAt };

	const handleOnClickSaveButton = () => {
		if (task.description === newTaskDescription) {
			return;
		}

		changeASingleTaskData({ ...task, description: newTaskDescription });

		toast.success("Task description successfully changed!");
	};

	const handleDeleteTask = async () => {
		changeDialogueWindowData({
			message: {
				title: "Hold on!",
				description: "You're about to delete a task, are you sure about it?",
			},
			onConfirm: () => {
				removeTaskFromList(task.id);
				toast.success(`Task successfully removed`);
				closeModal();
			},
			onDenied: () => {
				toast.error(`Task not deleted: action canceled`);
				closeModal();
			},
		});
		openModal();
	};

	const subTaskListCallBack = (data: any) => {
		changeDialogueWindowData({
			message: {
				title: "Hold on!",
				description: "You're about to delete a subtask, are you sure about it?",
			},
			onConfirm: () => {
				changeASingleTaskData({
					...task,
					subTasks: data,
				});
				toast.success(`Task successfully removed`);
				closeModal();
			},
			onDenied: () => {
				toast.error(`SubTask not deleted: action canceled`);
				closeModal();
			},
		});
		openModal();
	};

	const maxSubTasksToList = 2;
	const notListedSubTasks = subTasks.length - maxSubTasksToList;

	return (
		<li className={`${taskCard} ${task.status === "concluded" && concluded}`}>
			<section>
				{canEdit ? (
					<input
						ref={ref}
						value={newTaskDescription}
						onChange={(element) => setNewTaskDescription(element.target.value)}
					/>
				) : (
					<header>{description}</header>
				)}
				<p>Created at: {dateFormat(dateFormatProps)}</p>
				{subTasks && (
					<SubTaskList
						list={task.subTasks}
						callBack={(data) => subTaskListCallBack(data)}
						compact
						canCheck={false}
						maxItems={maxSubTasksToList}
						style={{ margin: "1rem 0" }}
					/>
				)}

				{maxSubTasksToList < subTasks.length && (
					<NavLink
						to={`/details?taskId=${task.id}`}
						style={{ color: "var(--blue-300)", marginLeft: "1rem" }}
					>
						+ {notListedSubTasks}{" "}
						{notListedSubTasks > 1 ? "subtasks" : "subtask"}
					</NavLink>
				)}

				<OptionButtons
					canEdit={canEdit}
					setCanEdit={setCanEdit}
					onSave={handleOnClickSaveButton}
					onDelete={handleDeleteTask}
					task={task}
					className={cardOptionButtonContainer}
				/>
			</section>
		</li>
	);
};
