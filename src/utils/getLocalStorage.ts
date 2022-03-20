export const getLocalStorageItem = (key: string) =>
	localStorage.getItem(key) && JSON.parse(localStorage.getItem(key) || "");
