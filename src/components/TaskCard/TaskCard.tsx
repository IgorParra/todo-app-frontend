import { useState } from "react";
import { TaskProps } from "context/types";
import styles from "./styles.module.scss";
import { dateFormat } from "utils/date";
import { useTask } from "hooks";

import { CardOptionsButton } from "components/Buttons";

export const TaskCard = ({ task }: { task: TaskProps }) => {
	const { taskCard } = styles;
	const { id } = task;

	const { changeASingleTaskData } = useTask();
	const [canEdit, setCanEdit] = useState(false);
	const [newTaskDescription, setNewTaskDescription] = useState(
		task.description
	);

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

	return (
		<li className={taskCard}>
			<section>
				{canEdit ? (
					<input
						value={newTaskDescription}
						onChange={(element) => setNewTaskDescription(element.target.value)}
					/>
				) : (
					<header>{task.description}</header>
				)}
				<p>Created at: {dateFormat(dateFormatProps)}</p>

				<div
					style={{
						display: "flex",
						marginTop: "auto",
						marginLeft: "auto",
						gap: "10px",
					}}
				>
					<CardOptionsButton
						canEdit={canEdit}
						onClick={() => {
							if (canEdit) {
								handleOnClickSaveButton();
							}
							setCanEdit(!canEdit);
						}}
						buttonType="saveoredit"
					/>

					<CardOptionsButton
						onClick={() => {
							if (canEdit) {
								handleOnClickSaveButton();
							}
							setCanEdit(!canEdit);
						}}
						buttonType="delete"
					/>

					<CardOptionsButton
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
