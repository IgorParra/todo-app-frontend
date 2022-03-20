import styles from "./styles.module.scss";

export const Input = ({
	id,
	label,
	value,
}: {
	id: string;
	label: string;
	value: string;
}) => {
	const { container } = styles;
	return (
		<div className={container}>
			<label htmlFor={id}>{label}</label>
			<input id={id} value={value} />
		</div>
	);
};
