// npm libs
import classnames from 'classnames';
import React from 'react';

// styles
import styles from './Header.less';

const Header = () => (
	<header className={classnames(styles.header)}>
		<nav className={classnames(styles.headerNavbar)}>
			<h1 className={classnames(styles.headerTitleContainer)}>
				<i id="header-menu-icon" className={classnames('material-icons', styles.headerMenuIcon)}>&#xE5D2;</i>
				<span className={classnames(styles.headerTitle)} id="header-title">
					playlist
				</span>
			</h1>
		</nav>
	</header>
);

export default Header;