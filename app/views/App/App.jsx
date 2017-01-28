// import React from 'react';

import MainMenu from 'views/MainMenu/MainMenu.jsx';
import Player from 'components/Player/Player.jsx';

import styles from './App.css';

const App = ({
	children
}) => (
	<div className={`container ${styles.parentContainer}`}>
		<div className={styles.parentContainerChild}>
			<MainMenu />
			<header className={styles.header}>
				<nav className={`navbar navbar-default ${styles.headerNavbar}`}>
					<h1 className={styles.headerTitleContainer}>
						<i id="header-menu-icon" className={`material-icons ${styles.headerMenuIcon}`}>menu</i>
						<span className={styles.headerTitle} id="header-title">
							Player
						</span>
					</h1>
				</nav>
			</header>
			<div className={styles.content}>
				{children}
			</div>
			<Player />
		</div>
	</div>
);

App.propTypes = {
	children: React.PropTypes.element
};

export default App;