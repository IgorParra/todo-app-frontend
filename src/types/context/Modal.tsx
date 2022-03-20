export type ChangeDialogueWindowCallbackProps = {
	onConfirm: () => any;
	onDenied: () => any;
};

export type ModalProdiverProps = {
	changeDialogueWindowCallback: ({
		onConfirm,
		onDenied,
	}: ChangeDialogueWindowCallbackProps) => void;
	changeDialogueWindowData: ({
		title,
		description,
		onConfirm,
		onDenied,
	}: ChangeDialogueWindowDataProps) => void;
	closeModal: () => void;
	openModal: () => void;
};

export type ChangeDialogueWindowDataProps = {
	title: string;
	description: string;
	onConfirm: () => any;
	onDenied: () => any;
};
