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
import store from 'store';

// styles
import styles from './MainMenu.less';

class MainMenu extends React.Component {

	constructor() {
		super();
		this.onClickLink = this.onClickLink.bind(this);
		this.toggleClassMenu = this.toggleClassMenu.bind(this);
	}

	componentDidMount() {
		document.getElementById('header-menu-icon').addEventListener('click', this.toggleClassMenu, false);
	}

	onClickLink(event) {
		this.selectedItemPath = event.currentTarget.getAttribute('data-link');
	}

	toggleClassMenu() {
		if (!this.menuRef.classList.contains(styles['menuContainer--visible'])) {
			this.menuRef.classList.add(styles['menuContainer--visible']);
		} else {
			this.menuRef.classList.remove(styles['menuContainer--visible']);
		}
		if (this.selectedItemPath) {
			browserHistory.push(this.selectedItemPath);
			store.dispatch(closePlayerAction(true));
			this.selectedItemPath = '';
		}
	}

	render() {

		return (
			<div className={classnames(styles.menuContainer)} ref={(ref) => { this.menuRef = ref; }} onClick={this.toggleClassMenu}>
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