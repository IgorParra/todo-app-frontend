import { Header } from "components";
import styles from "./styles.module.scss";

export const CommonPage = ({ children }: { children: JSX.Element }) => {
	const { container } = styles;
	return (
		<main className={container}>
			<Header />
			{children}
		</main>
	);
};
