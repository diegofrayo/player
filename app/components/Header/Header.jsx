// npm libs
import React from 'react';

// styles
import styles from './Header.less';

const Header = () => (
	<header className={styles.header}>
		<nav className={`navbar navbar-default ${styles.headerNavbar}`}>
			<h1 className={styles.headerTitleContainer}>
				<i id="header-menu-icon" className={`material-icons ${styles.headerMenuIcon}`}>&#xE5D2;</i>
				<span className={styles.headerTitle} id="header-title">
					playlist
				</span>
			</h1>
		</nav>
	</header>
);

export default Header;