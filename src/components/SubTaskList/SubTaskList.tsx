import { List } from "components";
import lodash from "lodash";
import { forwardRef, HTMLAttributes } from "react";
import { SubTaskProps } from "types/context/Task";
import { isValidDescription } from "utils";
import { SubTaskListItem } from "./SubTaskListItem";

type SubTaskListProps = HTMLAttributes<HTMLUListElement> & {
	list: SubTaskProps[];
	callBack: (task: any) => void;
	compact?: boolean;
	maxItems?: number;
	canCheck?: boolean;
};

export const SubTaskList = forwardRef<HTMLUListElement, SubTaskListProps>(
	({ list, callBack, compact, maxItems, canCheck = false, ...rest }, ref) => {
		const handleRemoveSubTaskFromList = (subTaskId: string) => {
			const newSubTaskList = lodash.cloneDeep(list);

			const subtaskToUpdateIndex = newSubTaskList.findIndex(
				(task) => task.id === subTaskId
			);

			newSubTaskList.splice(subtaskToUpdateIndex, 1);
			callBack(newSubTaskList);
		};

		const handleEditSubtask = (subTask: SubTaskProps) => {
			const { id, description } = subTask;
			if (
				!isValidDescription({
					field: "subTask",
					description: description,
				})
			) {
				return;
			}

			const newSubTaskList = lodash.cloneDeep(list);

			const subtaskToUpdateIndex = newSubTaskList.findIndex(
				(task) => task.id === id
			);

			if (subtaskToUpdateIndex >= 0) {
				newSubTaskList[subtaskToUpdateIndex] = subTask;
			}

			callBack(newSubTaskList);
		};

		const items = list.map((subTask) => (
			<SubTaskListItem
				subTask={subTask}
				onExclude={handleRemoveSubTaskFromList}
				onEdit={handleEditSubtask}
				canCheck={canCheck}
				compact={compact}
				key={subTask.id + subTask.description}
			/>
		));

		return <List items={items} maxItems={maxItems} ref={ref} {...rest} />;
	}
);
