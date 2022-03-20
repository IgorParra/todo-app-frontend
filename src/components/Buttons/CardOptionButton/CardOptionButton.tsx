import { ButtonHTMLAttributes } from "react";
import { FiEdit, FiSave, FiTrash2, FiPlus } from "react-icons/fi";
import styles from "./styles.module.scss";

type CardOptionsButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	buttonType: "saveoredit" | "delete" | "moreinfo";
	canEdit?: boolean;
};

export const CardOptionButton = ({
	canEdit,
	onClick,
	buttonType = "moreinfo",
	...rest
}: CardOptionsButtonProps) => {
	const buttonIcons = {
		saveoredit: canEdit ? <FiSave /> : <FiEdit />,
		delete: <FiTrash2 />,
		moreinfo: <FiPlus />,
	};

	return (
		<button className={styles[buttonType]} onClick={onClick} {...rest}>
			{buttonIcons[buttonType]}
		</button>
	);
};
