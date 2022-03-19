import { IoIosNotifications, IoIosSettings } from "react-icons/io";
import styles from "./styles.module.scss";

import CogiaLogo from "assets/images/cogia-logo.png";
import Profile from "assets/images/profile-picture.jpg";

export const Header = () => {
	const { headerContainer, notifyIcon, notifyIconContainer, profileIcon } =
		styles;
	return (
		<header className={headerContainer}>
			<div>
				<a href="/">
					<img
						src={CogiaLogo}
						alt="cogia logo composed by a butterfly and 'cogia intelligence' written on right"
					/>
				</a>

				<nav>
					<IoIosSettings color={"var(--white)"} />
					<div className={notifyIconContainer}>
						<IoIosNotifications color={"var(--white)"} />
						<div className={notifyIcon}>2</div>
					</div>

					<div
						className={profileIcon}
						style={{
							backgroundImage: `url(${Profile}`,
						}}
					/>
				</nav>
			</div>
		</header>
	);
};
