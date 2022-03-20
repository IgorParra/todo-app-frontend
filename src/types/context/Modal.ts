export type ChangeDialogueWindowCallbackProps = {
	onConfirm: () => any;
};

export type ModalProdiverProps = {
	changeDialogueWindowData: ({
		message,
		onConfirm,
		onDenied,
	}: ChangeDialogueWindowDataProps) => void;
	closeModal: () => void;
	openModal: () => void;
};

export type ChangeDialogueWindowDataProps = {
	message: { title: string; description: string };
	onConfirm: () => any;
	onDenied: () => any;
};
