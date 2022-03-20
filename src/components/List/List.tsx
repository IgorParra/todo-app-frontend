import { DetailedHTMLProps, HTMLAttributes } from "react";

type ListProps = DetailedHTMLProps<
	HTMLAttributes<HTMLUListElement>,
	HTMLUListElement
> & {
	items: JSX.Element[];
};

export const List = ({ items, ...rest }: ListProps) => {
	return <ul {...rest}>{items.map((Item) => Item)}</ul>;
};
