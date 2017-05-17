// npm libs
import classnames from 'classnames';
import React from 'react';
import {
	browserHistory
} from 'react-router';

// js utils
import APP from 'utils/app';
import routerUrls from 'utils/routerUrls';

// redux
import {
	closePlayer as closePlayerAction
} from 'actions/player';
import store from 'store/index';

// styles
import styles from './MainMenu.less';

class MainMenu extends React.Component {

	constructor() {

		super();

		document.addEventListener('DOMContentLoaded', () => {

			const myMenu = document.getElementById('menu-container');

			const toggleClassMenu = () => {
				myMenu.classList.add(styles['menuContainer--animatable']);
				if (!myMenu.classList.contains(styles['menuContainer--visible'])) {
					myMenu.classList.add(styles['menuContainer--visible']);
				} else {
					myMenu.classList.remove(styles['menuContainer--visible']);
				}
			};

			const OnTransitionEnd = () => {
				myMenu.classList.remove(styles['menu--animatable']);
				if (this.selectedItemPath) {
					browserHistory.push(this.selectedItemPath);
					store.dispatch(closePlayerAction(true));
					this.selectedItemPath = '';
				}
			};

			myMenu.addEventListener('transitionend', OnTransitionEnd, false);
			myMenu.addEventListener('click', toggleClassMenu, false);
			document.getElementById('header-menu-icon').addEventListener('click', toggleClassMenu, false);

		}, false);

		this.onClickLink = this.onClickLink.bind(this);
	}

	onClickLink(event) {
		this.selectedItemPath = event.currentTarget.getAttribute('data-link');
	}

	render() {

		return (
			<div className={classnames(styles.menuContainer)} id="menu-container">
				<div className={classnames(styles.menuContainerInner)}>
					<div className={classnames(styles.username)}>
						@{APP.username}
					</div>
					<ul className={classnames(styles.menu)}>
						<li className={classnames(styles.menuItem)}>
							<a onClick={this.onClickLink} data-link={routerUrls.PLAYLIST} className={classnames(styles.menuItemLink)}>
								<i className={classnames('material-icons', styles.menuItemIcon)}>&#xE030;</i>
								<span>Playlist</span>
							</a>
						</li>
						<li className={classnames(styles.menuItem)}>
							<a onClick={this.onClickLink} data-link={routerUrls.SEARCH} className={classnames(styles.menuItemLink)}>
								<i className={classnames('material-icons', styles.menuItemIcon)}>&#xE8B6;</i>
								<span>Search</span>
							</a>
						</li>
						<li className={classnames(styles.menuItem)}>
							<a onClick={this.onClickLink} data-link={routerUrls.FAVORITES} className={classnames(styles.menuItemLink)}>
								<i className={classnames('material-icons', styles.menuItemIcon)}>&#xE8D0;</i>
								<span>Favorites</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		);

	}

}

export default MainMenu;