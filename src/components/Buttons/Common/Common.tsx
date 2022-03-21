import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	theme: "danger" | "success";
	label: string | JSX.Element;
};

export const Common = ({ theme, label, ...rest }: ButtonProps) => {
	const { container } = styles;
	return (
		<button
			className={container}
			style={{ backgroundColor: `var(--${theme})` }}
			{...rest}
		>
			{label}
		</button>
	);
};
