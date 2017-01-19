// import React from 'react';

import {
	Link
} from 'react-router';

class MainMenu extends React.Component {

	constructor() {

		super();

		document.addEventListener('DOMContentLoaded', () => {

			const myMenu = document.querySelector('.menu');

			const toggleClassMenu = function toggleClassMenu() {

				myMenu.classList.add('menu--animatable');

				if (!myMenu.classList.contains('menu--visible')) {
					myMenu.classList.add('menu--visible');
				} else {
					myMenu.classList.remove('menu--visible');
				}
			};

			const OnTransitionEnd = function OnTransitionEnd() {
				myMenu.classList.remove('menu--animatable');
			};

			myMenu.addEventListener('transitionend', OnTransitionEnd, false);
			myMenu.addEventListener('click', toggleClassMenu, false);
			document.querySelector('.menu-icon').addEventListener('click', toggleClassMenu, false);

		}, false);

	}

	render() {

		return (
			<div className="menu">
				<div className="app-menu">
					<ul className="app-menu-ul">
						<li className="app-menu-li">
							<Link to="/playlist">
								<i className="material-icons">library_music</i>
								Playlist
							</Link>
						</li>
						<li className="app-menu-li">
							<Link to="/searches">
								<i className="material-icons">search</i>
								Búsquedas
							</Link>
						</li>
						<li className="app-menu-li">
							<Link to="/favorites">
								<i className="material-icons">stars</i>
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