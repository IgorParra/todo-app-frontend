import { createContext, useState } from "react";
import {
	ChangeDialogueWindowCallbackProps,
	ModalProdiverProps,
} from "types/context/Modal";
import { ProviderProps } from "../types";
import { DialogueWindow } from "./DialogueWindow/DialogueWindow";
import styles from "./styles.module.scss";

export const ModalContext = createContext({} as ModalProdiverProps);

export const ModalProdiver = ({ children }: ProviderProps) => {
	const { modalContainer, modalLayer } = styles;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [dialogueWindowData, setDialogueWindowData] = useState({
		title: "",
		description: "",
		onConfirm: () => {},
		onDenied: () => {},
	});
	const { title, description, onConfirm, onDenied } = dialogueWindowData;

	const openModal = () => setModalIsOpen(true);
	const closeModal = () => setModalIsOpen(false);
	const changeDialogueWindowData = ({
		title,
		description,
		onConfirm,
		onDenied,
	}: typeof dialogueWindowData) =>
		setDialogueWindowData({ title, description, onConfirm, onDenied });

	const changeDialogueWindowCallback = ({
		onConfirm,
		onDenied,
	}: ChangeDialogueWindowCallbackProps) => {
		setDialogueWindowData((prevState) => ({
			...prevState,
			onConfirm,
			onDenied,
		}));
	};

	const modals = {
		dialogueWindow: (
			<DialogueWindow
				message={{
					title: title,
					description: description,
				}}
				closeModalFunction={closeModal}
				onConfirm={onConfirm}
				onDenied={onDenied}
			/>
		),
	};

	return (
		<ModalContext.Provider
			value={{
				changeDialogueWindowCallback,
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
