import React from 'react';

import MainMenu from 'components/MainMenu/MainMenu.jsx';
import Player from 'components/Player/Player.jsx';
import Header from 'components/Header/Header.jsx';

import styles from './App.less';

const App = ({
	children
}) => (
	<div className={`container ${styles.parentContainer}`}>
		<div className={styles.parentContainerChild}>
			<MainMenu />
			<Header />
			<div className={styles.content} id="content-wrapper">
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