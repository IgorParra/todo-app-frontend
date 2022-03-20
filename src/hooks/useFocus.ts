import { useRef } from "react";

export const useFocus = <T extends HTMLInputElement | HTMLAreaElement>() => {
	const htmlElRef = useRef<T>(null);

	const setFocus = () => {
		htmlElRef.current && htmlElRef.current.focus();
	};

	return [htmlElRef, setFocus];
};
