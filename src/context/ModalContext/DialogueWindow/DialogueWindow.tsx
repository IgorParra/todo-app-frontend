import { Common } from "components";
import styles from "./styles.module.scss";

import { FiX } from "react-icons/fi";

type DialogueWindowProps = {
	message: {
		title: string;
		description: string;
	};
	closeModalFunction: () => void;
	onConfirm: () => any;
	onDenied: () => any;
};

export const DialogueWindow = ({
	message: { title, description },
	closeModalFunction,
	onConfirm,
	onDenied,
}: DialogueWindowProps) => {
	const { actionButtonsContainer, container, dialogueDescription } = styles;

	return (
		<div className={container}>
			<header>
				<h1>{title}</h1>
				<button onClick={closeModalFunction}>
					<FiX />
				</button>
			</header>
			<p className={dialogueDescription}>{description}</p>
			<div className={actionButtonsContainer}>
				<Common theme="danger" label="No, I'm not sure" onClick={onDenied} />
				<Common
					theme="success"
					label="Yes, I wanna do it"
					onClick={onConfirm}
				/>
			</div>
		</div>
	);
};
