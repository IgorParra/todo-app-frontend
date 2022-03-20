export const getLocalStorageItem = (key: string) =>
	JSON.parse(localStorage.getItem(key) || "");
