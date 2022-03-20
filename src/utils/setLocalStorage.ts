export const setLocalStorageItem = ({
	key,
	value,
}: {
	key: string;
	value: any;
}) => localStorage.setItem(key, JSON.stringify(value));
