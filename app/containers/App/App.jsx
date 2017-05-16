// npm libs
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// react components
import Header from 'components/Header/Header.jsx';
import MainMenu from 'components/MainMenu/MainMenu.jsx';
import Player from 'components/Player/Player.jsx';

// styles
import styles from './App.less';

const App = ({
	children
}) => (
	<div className={classnames('u-box-shadow', styles.parentContainer)}>
		<div className={classnames(styles.parentContainerChild)}>
			<MainMenu />
			<Header />
			<div className={classnames(styles.content)} id="content-wrapper">
				{children}
			</div>
			<Player />
		</div>
	</div>
);

App.propTypes = {
	children: PropTypes.element.isRequired
};

export default App;