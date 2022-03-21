import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { FiEdit, FiSave, FiTrash2 } from "react-icons/fi";
import { SubTaskProps } from "types/context/Task";
import styles from "./styles.module.scss";

type SubTaskListItemProps = InputHTMLAttributes<HTMLInputElement> & {
	subTask: SubTaskProps;
	canCheck?: boolean;
	onExclude: (subTaskId: string) => void;
	onEdit: (subTask: SubTaskProps) => void;
	compact?: boolean;
};

export const SubTaskListItem = ({
	subTask,
	onEdit,
	canCheck = false,
	onExclude,
	compact,
}: SubTaskListItemProps) => {
	const { buttonsContainer, container, compactStyle } = styles;

	const [canEdit, setCanEdit] = useState(false);
	const [newSubTaskDescription, setNewTaskDescription] = useState(
		subTask.description
	);

	const onSaveSubTaskDescriptionChange = () => {
		onEdit({ ...subTask, description: newSubTaskDescription });
	};

	const onCheckTaskChange = (element: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { checked },
		} = element;

		const isConcluded = checked;

		onEdit({ ...subTask, isConcluded });
	};

	return (
		<li
			className={`${container} ${compact && compactStyle}`}
			style={subTask.isConcluded ? { opacity: 0.5 } : {}}
		>
			{canCheck && (
				<input
					id={`task-${subTask.id}`}
					type="checkbox"
					checked={subTask.isConcluded}
					onChange={(element) => onCheckTaskChange(element)}
				/>
			)}
			<label
				htmlFor={`task-${subTask.id}`}
				style={subTask.isConcluded ? { textDecoration: "line-through" } : {}}
			>
				{subTask.id} -
				<input
					value={newSubTaskDescription}
					onChange={(element) => setNewTaskDescription(element.target.value)}
					disabled={!canEdit}
				/>
			</label>

			{!subTask.isConcluded && (
				<div className={buttonsContainer}>
					<button
						onClick={() => {
							if (canEdit) {
								onSaveSubTaskDescriptionChange();
							}
							setCanEdit(!canEdit);
						}}
					>
						{canEdit ? <FiEdit /> : <FiSave />}
					</button>
					<button onClick={() => onExclude(subTask.id)}>
						<FiTrash2 />
					</button>
				</div>
			)}
		</li>
	);
};
