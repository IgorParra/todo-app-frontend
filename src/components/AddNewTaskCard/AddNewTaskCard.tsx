import { ChangeEventHandler, MouseEventHandler } from "react";
import { BsPlusLg } from "react-icons/bs";
import styles from "./styles.module.scss";

type AddNewTaskCardProps = {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	onChange?: ChangeEventHandler<HTMLTextAreaElement>;
	title?: string;
};

export const AddNewTaskCard = ({
	onClick,
	onChange,
	title,
}: AddNewTaskCardProps) => {
	const { container, addNewTaskInput } = styles;
	return (
		<section className={container}>
			{title && <h1>{title} </h1>}
			<button onClick={onClick}>
				<BsPlusLg />
			</button>
			<textarea
				className={addNewTaskInput}
				placeholder="Task description"
				onChange={onChange}
			/>
		</section>
	);
};
