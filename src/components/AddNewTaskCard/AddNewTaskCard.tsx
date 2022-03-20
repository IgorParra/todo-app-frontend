import { ChangeEventHandler, MouseEventHandler } from "react";
import { BsPlusLg } from "react-icons/bs";
import styles from "./styles.module.scss";

type AddNewTaskCardProps = {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	onChange?: ChangeEventHandler<HTMLTextAreaElement>;
	value: any;
};

export const AddNewTaskCard = ({
	onClick,
	onChange,
	value,
}: AddNewTaskCardProps) => {
	const { container, addNewTaskInput } = styles;
	return (
		<section className={container}>
			<button onClick={onClick}>
				<BsPlusLg />
			</button>
			<textarea
				className={addNewTaskInput}
				value={value}
				placeholder="Task description"
				onChange={onChange}
			/>
		</section>
	);
};
