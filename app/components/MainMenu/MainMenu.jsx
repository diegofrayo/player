import React from 'react';

import {
	Link
} from 'react-router';

import APP from 'utils/app';

import styles from './MainMenu.less';

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
					<div className={styles.username}>
						@{APP.username}
					</div>
					<ul className={styles.menu}>
						<li className={styles.menuItem}>
							<Link to="/player/playlist" className={styles.menuItemLink}>
								<i className={`material-icons ${styles.menuItemIcon}`}>&#xE030;</i>
								<span>Playlist</span>
							</Link>
						</li>
						<li className={styles.menuItem}>
							<Link to="/player/search" className={styles.menuItemLink}>
								<i className={`material-icons ${styles.menuItemIcon}`}>&#xE8B6;</i>
								<span>Search</span>
							</Link>
						</li>
						<li className={styles.menuItem}>
							<Link to="/player/favorites" className={styles.menuItemLink}>
								<i className={`material-icons ${styles.menuItemIcon}`}>&#xE8D0;</i>
								<span>Favorites</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		);

	}

}

export default MainMenu;