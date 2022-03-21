import { Input } from "components";
import { useTask } from "hooks";
import { useState, ChangeEvent, useRef } from "react";
import { isValidDescription } from "utils";
import { BsPlusLg } from "react-icons/bs";
import { toast } from "react-toastify";
import { SubTaskProps } from "types/context/Task";
import styles from "./styles.module.scss";
import { SubTaskList } from "components";

export const AddNewTaskCardInput = () => {
	const {
		container,
		addNewTask,
		addNewTaskInput,
		addNewSubTaskInput,
		showAccordion,
		subTaskInputContainer,
		subTasksListContainer,
	} = styles;
	const { addNewTaskToTaskList } = useTask();

	const taskDataInitialState = {
		description: "",
		subTaskDescription: "",
		subTasks: [] as SubTaskProps[],
	};

	const [taskData, setTaskData] = useState(taskDataInitialState);

	const { description, subTaskDescription, subTasks } = taskData;

	const [shouldPresentAccordion, setShouldPresentAccordion] = useState(false);
	const addNewTaskCardInputRef = useRef<HTMLElement>(null);

	const handleAddNewTask = async (description: string) => {
		try {
			await addNewTaskToTaskList({ description, subTasks });
			setTaskData(taskDataInitialState);
		} catch (e: any) {
			toast.error(e.message);
		}
	};

	const handleOnInputChange = (element: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = element;
		setTaskData((prevState) => ({ ...prevState, description: value }));
	};

	const handleAddNewSubTask = () => {
		if (
			!isValidDescription({
				field: "subTask",
				description: taskData.subTaskDescription,
			})
		) {
			return;
		}

		const newSubTaskId = subTasks.length + 1;

		const newSubTask: SubTaskProps = {
			id: newSubTaskId.toString(),
			description: subTaskDescription,
			isConcluded: false,
		};

		console.log(newSubTask);

		setTaskData((prevState) => ({
			...prevState,
			subTaskDescription: "",
			subTasks: [...prevState.subTasks, newSubTask],
		}));
	};

	const handleOnSubTaskInputChange = (
		element: ChangeEvent<HTMLInputElement>
	) => {
		const {
			target: { value },
		} = element;

		setTaskData((prevState) => ({ ...prevState, subTaskDescription: value }));
	};

	const verifyIfHasActiveInputs = () => {
		if (!addNewTaskCardInputRef.current) {
			return;
		}

		let hasActiveInputs = false;
		const activeInputs =
			addNewTaskCardInputRef.current?.querySelector("input:active");
		if (addNewTaskCardInputRef.current?.contains(activeInputs)) {
			hasActiveInputs = true;
		}

		setShouldPresentAccordion(hasActiveInputs);
	};

	const subTaskListCallBack = (subTask: SubTaskProps[]) => {
		setTaskData((prevState) => ({ ...prevState, subTasks: subTask }));
	};

	return (
		<section
			ref={addNewTaskCardInputRef}
			className={
				shouldPresentAccordion ? container + " " + showAccordion : container
			}
		>
			<button
				className={addNewTask}
				onClick={() => handleAddNewTask(description)}
			>
				<BsPlusLg />
			</button>
			<input
				className={addNewTaskInput}
				value={description}
				placeholder="Task description"
				onFocus={verifyIfHasActiveInputs}
				onBlur={verifyIfHasActiveInputs}
				onChange={(element) => handleOnInputChange(element)}
			/>
			<div className={subTaskInputContainer}>
				<Input
					label={"Subtask description"}
					type="text"
					onFocus={verifyIfHasActiveInputs}
					onBlur={verifyIfHasActiveInputs}
					value={subTaskDescription}
					onChange={(element) => handleOnSubTaskInputChange(element)}
					className={addNewSubTaskInput}
				/>{" "}
				<button onClick={() => handleAddNewSubTask()}>add</button>
			</div>

			<SubTaskList
				list={taskData.subTasks}
				compact
				callBack={(data) => subTaskListCallBack(data)}
				className={subTasksListContainer}
			/>
		</section>
	);
};
