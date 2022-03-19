export const dateFormat = ({
	locales,
	value,
}: {
	locales: string;
	value: Date;
}) => new Intl.DateTimeFormat(locales).format(value);
