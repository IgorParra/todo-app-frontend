export const hasAtLeastTwoWords = (phrase: string): boolean => {
	const splitedPhrase = phrase.split(" ");

	return splitedPhrase.length >= 2;
};
