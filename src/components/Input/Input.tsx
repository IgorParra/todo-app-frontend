import {  InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
};

export const Input = ({
	id,
	className,
	label,
	style,
	value,
	...rest
}: InputProps) => {
	const { container } = styles;
	return (
		<div style={style} className={`${container} ${className}`}>
			<label htmlFor={id}>{label}</label>
			<input id={id} value={value} {...rest} />
		</div>
	);
};
