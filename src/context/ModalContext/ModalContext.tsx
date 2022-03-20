import { createContext, useState } from "react";
import { ModalProdiverProps } from "types/context/Modal";
import { ProviderProps } from "../types";
import { DialogueWindow } from "./DialogueWindow/DialogueWindow";
import styles from "./styles.module.scss";

export const ModalContext = createContext({} as ModalProdiverProps);

export const ModalProdiver = ({ children }: ProviderProps) => {
	const { modalContainer, modalLayer } = styles;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [dialogueWindowData, setDialogueWindowData] = useState({
		message: { title: "", description: "" },
		onConfirm: () => {},
		onDenied: () => {},
	});
	const { message, onConfirm, onDenied } = dialogueWindowData;

	const openModal = () => setModalIsOpen(true);
	const closeModal = () => setModalIsOpen(false);

	const changeDialogueWindowData = ({
		message,
		onConfirm,
		onDenied,
	}: typeof dialogueWindowData) =>
		setDialogueWindowData({ message, onConfirm, onDenied });

	const modals = {
		dialogueWindow: (
			<DialogueWindow
				message={message}
				closeModalFunction={closeModal}
				onConfirm={onConfirm}
				onDenied={onDenied}
			/>
		),
	};

	return (
		<ModalContext.Provider
			value={{
				changeDialogueWindowData,
				closeModal,
				openModal,
			}}
		>
			{modalIsOpen && (
				<div className={modalContainer}>
					<div className={modalLayer} onClick={closeModal}></div>
					{modals["dialogueWindow"]}
				</div>
			)}
			{children}
		</ModalContext.Provider>
	);
};
