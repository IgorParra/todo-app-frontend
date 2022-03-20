import { useState } from "react";
import { NavLink } from "react-router-dom";
import { TaskProps } from "types/context/Task";
import styles from "./styles.module.scss";
import { dateFormat } from "utils/date";
import { useFocus, useTask } from "hooks";

import { CardOptionButton } from "components/Buttons";
import { useModal } from "hooks/useModal";
import { toast } from "react-toastify";

export const TaskCard = ({ task }: { task: TaskProps }) => {
	const { taskCard, cardOptionButtonContainer } = styles;
	const { id } = task;

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

		changeASingleTaskData({
			taskId: id,
			newTaskData: { description: newTaskDescription },
		});

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

	return (
		<li className={taskCard}>
			<section>
				{canEdit ? (
					<input
						ref={ref}
						value={newTaskDescription}
						onChange={(element) => setNewTaskDescription(element.target.value)}
					/>
				) : (
					<header>{task.description}</header>
				)}
				<p>Created at: {dateFormat(dateFormatProps)}</p>

				<div className={cardOptionButtonContainer}>
					<CardOptionButton
						canEdit={canEdit}
						title={canEdit ? "Save changes" : "Edit task title"}
						onClick={() => {
							if (canEdit) {
								handleOnClickSaveButton();
							}
							setCanEdit(!canEdit);
						}}
						buttonType="saveoredit"
					/>

					<CardOptionButton
						title="Delete this task"
						onClick={() => handleDeleteTask()}
						buttonType="delete"
					/>

					<NavLink to={`/details?taskId=${task.id}`} state={{ id: task.id }}>
						<CardOptionButton
							title="See details of this task"
							buttonType="moreinfo"
						/>
					</NavLink>
				</div>
			</section>
		</li>
	);
};
