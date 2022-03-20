export const dateFormat = ({
	locales,
	value,
}: {
	locales: string;
	value: Date;
}) => new Intl.DateTimeFormat(locales).format(new Date(value));
