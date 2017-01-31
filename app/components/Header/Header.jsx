// import React from 'react';

import styles from './Header.css';

const Header = () => (
	<header className={styles.header}>
		<nav className={`navbar navbar-default ${styles.headerNavbar}`}>
			<h1 className={styles.headerTitleContainer}>
				<i id="header-menu-icon" className={`material-icons ${styles.headerMenuIcon}`}>menu</i>
				<span className={styles.headerTitle} id="header-title">
					playlist
				</span>
			</h1>
		</nav>
	</header>
);

export default Header;