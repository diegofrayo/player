// import React from 'react';

import {
	Link
} from 'react-router';

import styles from './MainMenu.css';

class MainMenu extends React.Component {

	constructor() {

		super();

		document.addEventListener('DOMContentLoaded', () => {

			const myMenu = document.getElementById('menu-container');

			const toggleClassMenu = () => {

				myMenu.classList.add(styles.menuContainer__animatable);

				if (!myMenu.classList.contains(styles.menuContainer__visible)) {
					myMenu.classList.add(styles.menuContainer__visible);
				} else {
					myMenu.classList.remove(styles.menuContainer__visible);
				}
			};

			const OnTransitionEnd = () => {
				myMenu.classList.remove(styles.menu__animatable);
			};

			myMenu.addEventListener('transitionend', OnTransitionEnd, false);
			myMenu.addEventListener('click', toggleClassMenu, false);
			document.getElementById('header-menu-icon').addEventListener('click', toggleClassMenu, false);

		}, false);

	}

	render() {

		return (
			<div className={styles.menuContainer} id="menu-container">
				<div className={styles.menuContainerInner}>
					<ul className={styles.menu}>
						<li className={styles.menuItem}>
							<Link to="/playlist" className={styles.menuItemLink}>
								<i className={`material-icons ${styles.menuItemIcon}`}>library_music</i>
								Playlist
							</Link>
						</li>
						<li className={styles.menuItem}>
							<Link to="/searches" className={styles.menuItemLink}>
								<i className={`material-icons ${styles.menuItemIcon}`}>search</i>
								Búsquedas
							</Link>
						</li>
						<li className={styles.menuItem}>
							<Link to="/favorites" className={styles.menuItemLink}>
								<i className={`material-icons ${styles.menuItemIcon}`}>stars</i>
								Favoritos
							</Link>
						</li>
					</ul>
				</div>
			</div>
		);

	}

}

export default MainMenu;