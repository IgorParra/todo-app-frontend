import { useState } from "react";
import { TaskProps } from "context/TaskContext/types";
import styles from "./styles.module.scss";
import { dateFormat } from "utils/date";
import { useFocus, useTask } from "hooks";

import { CardOptionButton } from "components/Buttons";
import { useModal } from "hooks/useModal";

export const TaskCard = ({ task }: { task: TaskProps }) => {
	const { taskCard, cardOptionButtonContainer } = styles;
	const { id } = task;

	const { changeASingleTaskData } = useTask();
	const { openModal } = useModal();
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
	};

	const handleDeleteTask = () => {};

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

					<CardOptionButton
						title="See details of this task"
						onClick={() => {
							if (canEdit) {
								handleOnClickSaveButton();
							}
							setCanEdit(!canEdit);
						}}
						buttonType="moreinfo"
					/>
				</div>
			</section>
		</li>
	);
};
