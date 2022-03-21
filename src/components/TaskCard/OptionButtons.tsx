import { CardOptionButton } from "components";
import { DetailedHTMLProps } from "react";
import { NavLink } from "react-router-dom";
import { TaskProps } from "types/context/Task";

type OptionButtonProps = DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	canEdit: boolean;
	setCanEdit: (value: boolean) => void;
	onSave: (props?: any) => void;
	onDelete: (props?: any) => void;
	task: TaskProps;
};

export const OptionButtons = ({
	canEdit,
	setCanEdit,
	onSave,
	onDelete,
	task,
	...rest
}: OptionButtonProps) => {
	return (
		<div {...rest}>
			{task.status !== "concluded" && (
				<CardOptionButton
					canEdit={canEdit}
					title={canEdit ? "Save changes" : "Edit task title"}
					onClick={() => {
						if (canEdit) {
							onSave();
						}
						setCanEdit(!canEdit);
					}}
					buttonType="saveoredit"
				/>
			)}

			<CardOptionButton
				title="Delete this task"
				onClick={() => onDelete()}
				buttonType="delete"
			/>

			<NavLink to={`/details?taskId=${task.id}`}>
				<CardOptionButton
					title="See details of this task"
					buttonType="moreinfo"
				/>
			</NavLink>
		</div>
	);
};
