import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";

type ListProps = DetailedHTMLProps<
	HTMLAttributes<HTMLUListElement>,
	HTMLUListElement
> & {
	items: JSX.Element[];
	maxItems?: number;
};

export const List = forwardRef<HTMLUListElement, ListProps>(
	({ items, maxItems = false, ...rest }, ref) => {
		return (
			<ul ref={ref} {...rest}>
				{maxItems
					? items.flatMap((Item, index) => {
							return index + 1 <= maxItems ? Item : <> </>;
					  })
					: items.map((Item) => Item)}
			</ul>
		);
	}
);
