// import React from 'react';

import MainMenu from 'views/MainMenu/MainMenu.jsx';
import Player from 'components/Player/Player.jsx';

class App extends React.Component {

	render() {

		return (
			<div className="parent-container-child">
				<MainMenu />
				<header className="header z-depth-1">
					<nav className="navbar navbar-default">
						<h1 className="header-h1">
							<i className="material-icons menu-icon">menu</i>
							<span className="header-name" id="header-name">Player</span>
						</h1>
					</nav>
				</header>
				{this.props.children}
				<Player />
			</div>
		);

	}

}

export default App;